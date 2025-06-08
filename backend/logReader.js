const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Get powershell command path based on OS
function getPowerShellCommand() {
  if (os.platform() === 'win32') {
    return path.join(process.env.WINDIR, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  } else {
    return 'pwsh';
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
              TimeCreated = $_.TimeCreated
              Message = $_.Message
            }
          } | ConvertTo-Json -Compress

        Write-Output $events
      }
      catch {
        Write-Output ("Error fetching logs: " + $_.Exception.Message)
      }
      Start-Sleep -Seconds 5
    }
    `
  ]);

  let buffer = '';

  powershell.stdout.on('data', (data) => {
    buffer += data.toString();

    try {
      const parsedLogs = JSON.parse(buffer);
      const logs = Array.isArray(parsedLogs) ? parsedLogs : [parsedLogs];

      logs.forEach(log => {
        socket.emit('newLog', {
          timestamp: new Date(log.TimeCreated).toLocaleTimeString(),
          message: log.Message?.trim() || 'No message',
        });
      });

      buffer = '';
    } catch (err) {
      // Wait for more data if JSON incomplete
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
