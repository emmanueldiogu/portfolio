# My portfolio page

**Design Idea:** Frontend Mentor






## How to access services Running inside WSL 2 from other devices in your LAN

- use this to add port proxy using PowerShell.
```pwsh
netsh interface portproxy add v4tov4 `
listenport=8080 `
listenaddress=0.0.0.0 `
connectport=8080 `
connectaddress=(wsl hostname -I)
```
- use `wf` on PowerShell to navigate to the Windows Firewall and set an inbound rule to allow the ports you have just added to the proxy port.
- Learn more from [David Bombal](https://youtu.be/yCK3easuYm4) and [Microsoft](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-a-wsl-2-distribution-from-your-local-area-network-lan)
- To remove port proxy `Remove-NetPortProxy -LocalIPAddress (wsl hostname -I) -LocalPort 5173` or `netsh interface portproxy delete v4tov4 listenaddress=(wsl hostname -I) listenport=5173`
- To list port proxy `netsh interface portproxy show all`


## Deply Vite app to Netlify

- Install Netlify globally id not already installed `npm install netlify-cli -g`
- Initialize netlify in your project `netlify init`
- Follow the prompt to setup
- `git push` Push to your git repository to trigger new site builds
- `netlify open` Open the Netlify admin URL of your site
