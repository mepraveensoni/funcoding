// get the select element and additional-options element
const popupList = document.getElementById("popup-list");
const additionalOptions = document.querySelector('#additional-options-select');

const proceedBtn = document.getElementById("generate-notes");
proceedBtn.addEventListener("click", createNotes);

// get the device type element
const deviceType = document.querySelector('#device-type');

deviceType.addEventListener("change", function() {
  popupList.innerHTML = "";
  const selectedDeviceType = deviceType.value;

    // add event listener to the reset button
  const resetBtn = document.querySelector('#reset');
  const notesOutput = document.querySelector('#notes-output');

  resetBtn.addEventListener('click', () => {
  notesOutput.value = '';
  location.reload(); // Reload the page
  });

    // create an array of option values based on the selectedOption
    let options = [];

    switch (selectedDeviceType) {
      case "select-option":
        options = ["Select Options"];
        break;
      case "server":
        options = ["Select Option", "Server Devices", "Antivirus", "Patch Status", "Backup" , "Storage", "Logical Drives Status", "ESX"];
        break;
      case "network":
        options = ["Select Option", "Multiple Devices", "Network Devices", "ESX"];
        break;
      case "camera":
        options = ["Select Option", "Camera Status"];
        break;
      case "storage":
        options = ["Select Option", "Server Devices", "Storage", "Logical Drives Status", "ESX"];
        break;
      case "orion":
        options = ["Select Option", "Orion"];
        break;
      default:
        options = [];
        break;
    }

    // create the options in additionalOptions element
  options.forEach(function(optionValue) {
    const option = document.createElement("option");
    option.value = optionValue;
    option.text = optionValue;
    popupList.add(option);
  });

  // add an event listener to the popupList select element
popupList.addEventListener("change", function() {
  // clear any previous options from additionalOptions element
  additionalOptions.innerHTML = "";
  
  // get the selected option value from popupList
  const selectedOption = popupList.value;
  
    // create an array of option values based on the selectedOption
    let options = [];
    switch (selectedOption) {
      case "Select Options":
        options = ["Select Options"];
        break;
      case "Multiple Devices":
        options = ["Select Options", "ISP Outage", "Area Wide Outage", "Power Outage", "Site Down", "Multiple P1", "Others"];
        break;
      case "Server Devices":
        options = ["Select Options", "Connectivity", "Internal Down", "Agent Down", "Agent Down/Connectivity Up", "High CPU", "High Memory", "Services", "Citrix Host Down", "Others"];
        break;
      case "Network Devices":
        options = ["Select Options", "ISP Outage", "Area Wide Outage", "Power Outage", "Site Connectivity Down", "Modem Connectivity Down", "Meraki Connectivity Device", "Internal Connectivity Down", "External Gateway Pinging Layer 1 Required", "Others"];
        break;
      case "Antivirus":
        options = ["Select Options", "Antivirus", "Antivirus Event File", "Antivirus Event URL", "Antivirus Install Failed", "Antivirus Install In-Progress", "Antivirus Insufficient Drive", "Antivirus Signature Age", "Antivirus Pending Reboot", "Antivirus Offline", "Others"];
        break;
      case "Patch Status":
        options = ["Select Options", "Patch Status", "Patch Status PME Failed", "Patch Status Windows Update Failed", "Patch Status Offline", "Patch Status Missing Patch", "Patch Status Pending Reboot", "Patch Status Age", "Others"];
        break;
      case "Backup":
        options = ["Select Options", "Backup", "Total Backup Failed", "System Backup Failed", "File and Folder Backup Failed", "Backup In-Progress", "Backup Recovered", "Others"];
        break;
      case "Storage":
        options = ["Select Options", "Drive Alert", "C Drive", "D Drive", "Other Drive", "Others"];
        break;
      case "Logical Drives Status":
        options = ["Select Options", "Logical Drive", "Logical Drive Latency", "Logical Drive Failed", "Others"];
        break;
      case "ESX":
        options = ["Select Options", "ESX Connectivity", "ESX VMware Connectivity", "ESX Datastore", "ESX Others"];
        break;
      case "Camera Status":
        options = ["Select Options", "Camera Connectivity", "DVR Connectivity", "Others"];
        break;
      case "Orion":
        options = ["Select Options", "Interface 100", "Interface 200", "Interface 300","Interface 500", "Interface 600", "Interface 700", "Node", "NACA", "Group Down", "NACA Meraki Down", "Internal Issue"];
        break;
      default:
        options = [];
        break;
    }
    
    // create the options in additionalOptions element
    options.forEach(function(optionValue) {
      const option = document.createElement("option");
      option.value = optionValue;
      option.text = optionValue;
      additionalOptions.add(option);
    });
  });

});

function createNotes() {
    try {
      const deviceName = document.querySelector('#device-name').value;
      const deviceType = document.querySelector('#device-type').value;
      const deviceIP = document.querySelector('#ip-address').value;
      const notesMode = document.querySelector('input[name="notes-mode"]:checked').value;
      const popupList = document.getElementById('popup-list').value;
      const additionalOptionsSelect = additionalOptions.value;
      const notesOutput = document.getElementById('notes-output');
      console.log(popupList,additionalOptions,notesMode,deviceIP,deviceType,deviceName);
    
      switch (deviceType) {
        default:
          switch (notesMode) {
            case 'first-response':
              switch (popupList) {
                case 'Multiple Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/ISP issue causing the site down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Multiple P1':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Server Devices':
                  switch (additionalOptionsSelect) {
                      case 'Connectivity':
                          notesOutput.innerHTML = `FR Connectivity Server Device - We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                          break;
                      case 'Internal Down':
                      notesOutput.innerHTML = `FR Internal Down Server Device- We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Network Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Modem Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Meraki Connectivity Device':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Internal Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'External Gateway Pinging Layer 1 Required':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Antivirus':
                  switch (additionalOptionsSelect) {
                    case 'Antivirus':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Event File':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Event URL':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install Failed':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install In-Progress':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Insufficient Drive':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Antivirus Signature Age':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Pending Reboot':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Offline':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Patch Status':
                  switch (additionalOptionsSelect) {
                    case 'Patch Status':
                      notesOutput.innerHTML = `We have verified `;
                      break;
                    case 'Patch Status PME Failed':
                      notesOutput.innerHTML = `Patch Status PME Failed`;
                      break;
                    case 'Patch Status Windows Update Failed':
                      notesOutput.innerHTML = `Patch Status Windows Update Failed`;
                      break;
                    case 'Patch Status Offline':
                      notesOutput.innerHTML = `Patch Status Offline`;
                      break;
                    case 'Patch Status Missing Patch':
                      notesOutput.innerHTML = `Patch Status Missing Patch`;
                      break;
                    case 'Patch Status Pending Reboot':
                      notesOutput.innerHTML = `Patch Status Pending Reboot`;
                      break;
                    case 'Patch Status Age':
                      notesOutput.innerHTML = `Patch Status Age`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Backup':
                  switch (additionalOptionsSelect) {
                    case 'Backup':
                      notesOutput.innerHTML = `Backup`;
                      break;
                    case 'Total Backup Failed':
                      notesOutput.innerHTML = `Total Backup Failed`;
                      break;
                    case 'System Backup Failed':
                      notesOutput.innerHTML = `System Backup Failed`;
                      break;
                    case 'File and Folder Backup Failed':
                      notesOutput.innerHTML = `File and Folder Backup Failed`;
                      break;
                    case 'Backup In-Progress':
                      notesOutput.innerHTML = `Backup In-Progress`;
                      break;
                    case 'Backup Recovered':
                      notesOutput.innerHTML = `Backup Recovered`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Storage':
                  switch (additionalOptionsSelect) {
                    case 'Drive Alert':
                      notesOutput.innerHTML = `Drive Alert`;
                      break;
                    case 'C Drive':
                      notesOutput.innerHTML = `C Drive`;
                      break;
                    case 'D Drive':
                      notesOutput.innerHTML = `D Drive`;
                      break;
                    case 'Other Drive':
                      notesOutput.innerHTML = `Other Drive`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Logical Drives Status':
                  switch (additionalOptionsSelect) {
                    case 'Logical Drive':
                      notesOutput.innerHTML = `Logical Drive`;
                      break;
                    case 'Logical Drive Latency':
                      notesOutput.innerHTML = `Logical Drive Latency`;
                      break;
                    case 'Logical Drive Failed':
                      notesOutput.innerHTML = `Logical Drive Failed`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'ESX':
                  switch (additionalOptionsSelect) {
                    case 'ESX Connectivity':
                      notesOutput.innerHTML = `ESX Connectivity`;
                      break;
                    case 'ESX VMware Connectivity':
                      notesOutput.innerHTML = `ESX VMware Connectivity`;
                      break;
                    case 'ESX Datastore':
                      notesOutput.innerHTML = `ESX Datastore`;
                      break;
                    case 'ESX Others':
                      notesOutput.innerHTML = `ESX Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Camera Status':
                  switch (additionalOptionsSelect) {
                    case 'Camera Connectivity':
                      notesOutput.innerHTML = `Camera Connectivity`;
                      break;
                    case 'DVR Connectivity':
                      notesOutput.innerHTML = `DVR Connectivity`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Orion':
                  switch (additionalOptionsSelect) {
                    case 'Interface 100':
                      notesOutput.innerHTML = `Interface 100`;
                      break;
                    case 'Interface 200':
                      notesOutput.innerHTML = `Interface 200`;
                      break;
                    case 'Interface 300':
                      notesOutput.innerHTML = `Interface 300`;
                      break;
                    case 'Interface 500':
                      notesOutput.innerHTML = `The Tu500 interface on node(${deviceName}) is currently down and has been verified by our team through SolarWinds RMM. We are closely monitoring the interface and will take necessary action if required, including opening a provider ticket. We will continue to update the ticket until the issue is resolved.`;
                      break;  
                    case 'Interface 600':
                      notesOutput.innerHTML = `The Tu600 interface on node(${deviceName}) is currently down and has been verified by our team through SolarWinds RMM. We are closely monitoring the interface and will take necessary action if required, including opening a provider ticket. We will continue to update the ticket until the issue is resolved.`;
                      break;
                    case 'Interface 700':
                      notesOutput.innerHTML = `The Tu700 interface on node(${deviceName}) is currently down and has been verified by our team through SolarWinds RMM. We are closely monitoring the interface and will take necessary action if required, including opening a provider ticket. We will continue to update the ticket until the issue is resolved.`;
                      break;
                    case 'Node':
                      notesOutput.innerHTML = `Upon investigation, we have confirmed that the node is down, and the associated interfaces are also down. The alert for the node is accurate and we will be continuously monitoring the interfaces and the node. If necessary, we will open a provider ticket to address the issue.`;
                      break;
                    case 'NACA':
                      notesOutput.innerHTML = `We have investigated and confirmed the validity of the alert for the NACA appliance(${deviceName}). Our findings from both the Meraki Portal and SolarWinds RMM indicate that the appliance is currently offline. We will continue to monitor the device and escalate the issue to the provider if necessary.\n\nWe will keep you informed and provide updates regarding the progress of the issue.`;
                      break;
                    case 'Group Down':
                      notesOutput.innerHTML = `Group Down`;
                      break;
                    case 'NACA Meraki Down':
                      notesOutput.innerHTML = `NACA Meraki Down`;
                      break;
                    case 'Internal Issue':
                      notesOutput.innerHTML = `*** Tu2800/Tu2700/Tu2850/Tu2750 ***\n=====================================\nWe have checked and found the associated internal interfaces are showing down/unkknown. We are closing the ticket as no further action required on the internal issue.\n=====================================\n\nClosing the ticket.`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                default:
                  // handle default case
                  break;
              }
              break;
            case 'closing':
              switch (popupList) {
                case 'Multiple Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Multiple P1':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Server Devices':
                  switch (additionalOptionsSelect) {
                      case 'Connectivity':
                          notesOutput.innerHTML = `FR Connectivity Server Device - We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                          break;
                      case 'Internal Down':
                      notesOutput.innerHTML = `Closing Internal Down Server Device- We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Network Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Modem Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Meraki Connectivity Device':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Internal Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'External Gateway Pinging Layer 1 Required':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Antivirus':
                  switch (additionalOptionsSelect) {
                    case 'Antivirus':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Event File':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Event URL':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install Failed':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install In-Progress':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Insufficient Drive':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Antivirus Signature Age':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Pending Reboot':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Offline':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Patch Status':
                  switch (additionalOptionsSelect) {
                    case 'Patch Status':
                      notesOutput.innerHTML = `We have verified `;
                      break;
                    case 'Patch Status PME Failed':
                      notesOutput.innerHTML = `Patch Status PME Failed`;
                      break;
                    case 'Patch Status Windows Update Failed':
                      notesOutput.innerHTML = `Patch Status Windows Update Failed`;
                      break;
                    case 'Patch Status Offline':
                      notesOutput.innerHTML = `Patch Status Offline`;
                      break;
                    case 'Patch Status Missing Patch':
                      notesOutput.innerHTML = `Patch Status Missing Patch`;
                      break;
                    case 'Patch Status Pending Reboot':
                      notesOutput.innerHTML = `Patch Status Pending Reboot`;
                      break;
                    case 'Patch Status Age':
                      notesOutput.innerHTML = `Patch Status Age`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Backup':
                  switch (additionalOptionsSelect) {
                    case 'Backup':
                      notesOutput.innerHTML = `Backup`;
                      break;
                    case 'Total Backup Failed':
                      notesOutput.innerHTML = `Total Backup Failed`;
                      break;
                    case 'System Backup Failed':
                      notesOutput.innerHTML = `System Backup Failed`;
                      break;
                    case 'File and Folder Backup Failed':
                      notesOutput.innerHTML = `File and Folder Backup Failed`;
                      break;
                    case 'Backup In-Progress':
                      notesOutput.innerHTML = `Backup In-Progress`;
                      break;
                    case 'Backup Recovered':
                      notesOutput.innerHTML = `Backup Recovered`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Storage':
                  switch (additionalOptionsSelect) {
                    case 'Drive Alert':
                      notesOutput.innerHTML = `Drive Alert`;
                      break;
                    case 'C Drive':
                      notesOutput.innerHTML = `C Drive`;
                      break;
                    case 'D Drive':
                      notesOutput.innerHTML = `D Drive`;
                      break;
                    case 'Other Drive':
                      notesOutput.innerHTML = `Other Drive`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Logical Drives Status':
                  switch (additionalOptionsSelect) {
                    case 'Logical Drive':
                      notesOutput.innerHTML = `Logical Drive`;
                      break;
                    case 'Logical Drive Latency':
                      notesOutput.innerHTML = `Logical Drive Latency`;
                      break;
                    case 'Logical Drive Failed':
                      notesOutput.innerHTML = `Logical Drive Failed`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'ESX':
                  switch (additionalOptionsSelect) {
                    case 'ESX Connectivity':
                      notesOutput.innerHTML = `ESX Connectivity`;
                      break;
                    case 'ESX VMware Connectivity':
                      notesOutput.innerHTML = `ESX VMware Connectivity`;
                      break;
                    case 'ESX Datastore':
                      notesOutput.innerHTML = `ESX Datastore`;
                      break;
                    case 'ESX Others':
                      notesOutput.innerHTML = `ESX Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Camera Status':
                  switch (additionalOptionsSelect) {
                    case 'Camera Connectivity':
                      notesOutput.innerHTML = `Camera Connectivity`;
                      break;
                    case 'DVR Connectivity':
                      notesOutput.innerHTML = `DVR Connectivity`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Orion':
                  switch (additionalOptionsSelect) {
                    case 'Interface 100':
                      notesOutput.innerHTML = `Interface 100`;
                      break;
                    case 'Interface 200':
                      notesOutput.innerHTML = `Interface 200`;
                      break;
                    case 'Interface 300':
                      notesOutput.innerHTML = `Interface 300`;
                      break;
                    case 'Interface 500':
                      notesOutput.innerHTML = `Interface 100`;
                      break;  
                    case 'Interface 600':
                      notesOutput.innerHTML = `Interface 100`;
                      break;
                    case 'Interface 700':
                      notesOutput.innerHTML = `Interface 700`;
                      break;
                    case 'Node':
                      notesOutput.innerHTML = `Node`;
                      break;
                    case 'NACA':
                      notesOutput.innerHTML = `NACA`;
                      break;
                    case 'Group Down':
                      notesOutput.innerHTML = `Group Down`;
                      break;
                    case 'NACA Meraki Down':
                      notesOutput.innerHTML = `NACA Meraki Down`;
                      break;
                    case 'Internal Issue':
                      notesOutput.innerHTML = `Internal Issue`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                    break;
                  default:
                  // handle default case
                  break;
              }
              break;
            case 'monitoring':
              switch (popupList) {
                case 'Multiple Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `Monitoring - We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Multiple P1':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Server Devices':
                  switch (additionalOptionsSelect) {
                      case 'Connectivity':
                          notesOutput.innerHTML = `FR Connectivity Server Device - We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                          break;
                      case 'Internal Down':
                      notesOutput.innerHTML = `Closing Internal Down Server Device- We have checked and found the alert is true for the ${deviceType} device. the RMM is showing the alert true. We will continue to update this`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Network Devices':
                  switch (additionalOptionsSelect) {
                    case 'ISP Outage':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Area Wide Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Power Outage':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Site Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Modem Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Meraki Connectivity Device':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Internal Connectivity Down':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'External Gateway Pinging Layer 1 Required':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Antivirus':
                  switch (additionalOptionsSelect) {
                    case 'Antivirus':
                      notesOutput.innerHTML = `We have verified that the alert regarding the device(${deviceName}${" " + deviceIP}) is valid, as per the RMM system. Additionally, The ISP device(${deviceType} ${deviceIP}) is not pinging and we are aware of the ISP Outages that has affected the circuit on the site, \n\nWe will check for any details about the circuit provider and will get an update from them if possible, We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Event File':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Event URL':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install Failed':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Install In-Progress':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Antivirus Insufficient Drive':
                      notesOutput.innerHTML = `We have conducted an investigation and have confirmed that the alert for the device is valid. We have found that the device is not responding to pings and is currently showing as down in RMM. As this is a ${deviceType} device, we are conducting further investigation to identify the root cause of the issue.\n\nWe will continue to update the ticket as we gather more information on this matter.`;
                      break;
                    case 'Antivirus Signature Age':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are aware of the power outage in the area that has affected the circuit on the site, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Pending Reboot':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices(${deviceName}${" " + deviceIP}) are valid, as per the RMM system. Additionally, The site is completely down and we are investigating further on this if there is any power/isp issue causing the site connectivity down, \n\nWe are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.`;
                      break;
                    case 'Antivirus Offline':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `We have verified that the alerts regarding the devices are accurate, as per the RMM system. Additionally, we have received multiple alerts for the area, which suggests that there may be a widespread issue affecting multiple devices. We are closely monitoring the affected devices for any signs of recovery and continuing our investigation into the connectivity issues.\n\nWe will provide updates to the ticket with any new information or findings as we progress.\n\nPlease note that due to the multiple P1/P2 tickets we are currently handling, there may be some delay in our response times.\n\nDevices Affected : ${deviceType} ${deviceIP}`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Patch Status':
                  switch (additionalOptionsSelect) {
                    case 'Patch Status':
                      notesOutput.innerHTML = `We have verified `;
                      break;
                    case 'Patch Status PME Failed':
                      notesOutput.innerHTML = `Patch Status PME Failed`;
                      break;
                    case 'Patch Status Windows Update Failed':
                      notesOutput.innerHTML = `Patch Status Windows Update Failed`;
                      break;
                    case 'Patch Status Offline':
                      notesOutput.innerHTML = `Patch Status Offline`;
                      break;
                    case 'Patch Status Missing Patch':
                      notesOutput.innerHTML = `Patch Status Missing Patch`;
                      break;
                    case 'Patch Status Pending Reboot':
                      notesOutput.innerHTML = `Patch Status Pending Reboot`;
                      break;
                    case 'Patch Status Age':
                      notesOutput.innerHTML = `Patch Status Age`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Backup':
                  switch (additionalOptionsSelect) {
                    case 'Backup':
                      notesOutput.innerHTML = `Backup`;
                      break;
                    case 'Total Backup Failed':
                      notesOutput.innerHTML = `Total Backup Failed`;
                      break;
                    case 'System Backup Failed':
                      notesOutput.innerHTML = `System Backup Failed`;
                      break;
                    case 'File and Folder Backup Failed':
                      notesOutput.innerHTML = `File and Folder Backup Failed`;
                      break;
                    case 'Backup In-Progress':
                      notesOutput.innerHTML = `Backup In-Progress`;
                      break;
                    case 'Backup Recovered':
                      notesOutput.innerHTML = `Backup Recovered`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Storage':
                  switch (additionalOptionsSelect) {
                    case 'Drive Alert':
                      notesOutput.innerHTML = `Drive Alert`;
                      break;
                    case 'C Drive':
                      notesOutput.innerHTML = `C Drive`;
                      break;
                    case 'D Drive':
                      notesOutput.innerHTML = `D Drive`;
                      break;
                    case 'Other Drive':
                      notesOutput.innerHTML = `Other Drive`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Logical Drives Status':
                  switch (additionalOptionsSelect) {
                    case 'Logical Drive':
                      notesOutput.innerHTML = `Logical Drive`;
                      break;
                    case 'Logical Drive Latency':
                      notesOutput.innerHTML = `Logical Drive Latency`;
                      break;
                    case 'Logical Drive Failed':
                      notesOutput.innerHTML = `Logical Drive Failed`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'ESX':
                  switch (additionalOptionsSelect) {
                    case 'ESX Connectivity':
                      notesOutput.innerHTML = `ESX Connectivity`;
                      break;
                    case 'ESX VMware Connectivity':
                      notesOutput.innerHTML = `ESX VMware Connectivity`;
                      break;
                    case 'ESX Datastore':
                      notesOutput.innerHTML = `ESX Datastore`;
                      break;
                    case 'ESX Others':
                      notesOutput.innerHTML = `ESX Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Camera Status':
                  switch (additionalOptionsSelect) {
                    case 'Camera Connectivity':
                      notesOutput.innerHTML = `Camera Connectivity`;
                      break;
                    case 'DVR Connectivity':
                      notesOutput.innerHTML = `DVR Connectivity`;
                      break;
                    case 'Others':
                      notesOutput.innerHTML = `Others`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                case 'Orion':
                  switch (additionalOptionsSelect) {
                    case 'Interface 100':
                      notesOutput.innerHTML = `Interface 100`;
                      break;
                    case 'Interface 200':
                      notesOutput.innerHTML = `Interface 200`;
                      break;
                    case 'Interface 300':
                      notesOutput.innerHTML = `Interface 300`;
                      break;
                    case 'Interface 500':
                      notesOutput.innerHTML = `Interface 100`;
                      break;  
                    case 'Interface 600':
                      notesOutput.innerHTML = `Interface 100`;
                      break;
                    case 'Interface 700':
                      notesOutput.innerHTML = `Interface 700`;
                      break;
                    case 'Node':
                      notesOutput.innerHTML = `Node`;
                      break;
                    case 'NACA':
                      notesOutput.innerHTML = `NACA`;
                      break;
                    case 'Group Down':
                      notesOutput.innerHTML = `Group Down`;
                      break;
                    case 'NACA Meraki Down':
                      notesOutput.innerHTML = `NACA Meraki Down`;
                      break;
                    case 'Internal Issue':
                      notesOutput.innerHTML = `Internal Issue`;
                      break;
                    default:
                      // handle default case
                      break;
                  }
                  break;
                  default:
                  // handle default case
                  break;
              }
              break;
            default:
              // handle default case
              break;
          }
          break;
      }
    } catch (error) {
      console.error('Error occurred while creating notes:', error);
    }
  }
  
  const notesOutput = document.getElementById('notes-output');

  // Create a button element for copying the notes output
  const copyButton = document.createElement('button');
  copyButton.innerHTML = 'Copy Output';
  copyButton.addEventListener('click', function() {
    // Select the text in the notes output textarea and copy it to clipboard
    notesOutput.select();
    document.execCommand('copy');
  });
  
  // Append the copy button to the button container
  const buttonContainer = document.querySelector('.button-container');
  buttonContainer.appendChild(copyButton);
  
  function pingIP1() {
    if (navigator.onLine) {
      console.log("Internet Connection is present");
    } else {
      console.log("No internet Connection");
    }
  }

pingIP1();
