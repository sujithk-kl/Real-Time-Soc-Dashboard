const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

function getPowerShellCommand() {
  if (os.platform() === 'win32') {
    return path.join(process.env.WINDIR, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  } else {
    return 'pwsh';
  }
}

function mapSeverity(level) {
  switch (level) {
    case 1: return 'Critical';
    case 2: return 'Error';
    case 3: return 'Warning';
    case 4: return 'Information';
    case 5: return 'Verbose';
    default: return 'Unknown';
  }
}

function streamWindowsLogs(socket) {
  const powershellCmd = getPowerShellCommand();

  const powershell = spawn(powershellCmd, [
    '-Command',
    `
    while ($true) {
      try {
        $events = Get-WinEvent -LogName Application -MaxEvents 5 |
          ForEach-Object {
            [PSCustomObject]@{
              TimeCreated = $_.TimeCreated.ToUniversalTime().ToString("o")
              Message = $_.Message
              Level = $_.Level
            }
          } | ConvertTo-Json -Compress

        Write-Output $events
      } catch {
        Write-Output ("Error fetching logs: " + $_.Exception.Message)
      }
      Start-Sleep -Seconds 5
    }
    `
  ]);

  let buffer = '';

  powershell.stdout.on('data', (data) => {
    buffer += data.toString();

    if (buffer.trim().endsWith(']') || buffer.trim().startsWith('{')) {
      try {
        const parsedLogs = JSON.parse(buffer);
        const logs = Array.isArray(parsedLogs) ? parsedLogs : [parsedLogs];

        logs.forEach(log => {
          const timestamp = new Date(log.TimeCreated);
          const [date, time] = timestamp.toLocaleString().split(', ');
          socket.emit('newLog', {
            date: date || '',
            time: time || '',
            severity: mapSeverity(log.Level),
            message: log.Message?.trim() || 'No message',
          });
        });

        buffer = '';
      } catch {
        // wait for more data
      }
    }
  });

  powershell.stderr.on('data', (err) => {
    console.error(`PowerShell Error: ${err}`);
  });

  powershell.on('exit', (code) => {
    console.log(`PowerShell exited with code ${code}`);
  });
}

module.exports = streamWindowsLogs;
