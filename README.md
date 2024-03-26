# IPSWDL.COM API

This is the official API of the ipswdl.com website. Although ipswdl.com uses ipsw.me API, it has it's API built according to the data structure of the site.
With this API build using Express, Node.js, you can fetch:

## Home page index

> /index
Use this endpoint to get homepage device paths.


> [!NOTE]
> This endpoint might not be very useful if you intend to exploit this API

## Get devices

You can get the names of different devices, their firmware identifier and image path using the following endpoints based on the device.
### iPhones
> /devices/iphone

Use this Endpoint to get the list of all phones, their firmware identifier and image path. Using this should give the following response:

```
{
  "devices": [
    {
      "identifier": "iPhone16,2",
      "name": "iPhone 15 Pro Max",
      "image": "/assets/images/iphones/iPhone16,2.png"
    },
    {
      "identifier": "iPhone16,1",
      "name": "iPhone 15 Pro",
      "image": "/assets/images/iphones/iPhone16,1.png"
    },
    {
      "identifier": "iPhone15,5",
      "name": "iPhone 15 Plus",
      "image": "/assets/images/iphones/iPhone15,5.png"
    },
    {
      "identifier": "iPhone15,4",
      "name": "iPhone 15",
      "image": "/assets/images/iphones/iPhone15,4.png"
    },
```
### iPads
> /devices/ipad

Use this endpoint for all iPads and their identifier plus image path. The response should look exactly like the one for iPhones above

### MacBooks
> /devices/mac

### AppleTV
> /devices/appletv

## AppleWatch
> /devices/watch

### iPods and other Audio Accessories
> /devices/audioaccessories

With this, you should get response like ;
```

  "devices": [
    {
      "identifier": "AudioAccessory6,1",
      "name": "HomePod (2nd generation)",
      "image": "/assets/images/iphones/AudioAccessory6,1.png"
    },
    {
      "identifier": "AudioAccessory5,1",
      "name": "HomePod mini",
      "image": "/assets/images/iphones/AudioAccessory5,1.png"
    },
    {
      "identifier": "iPod9,1",
      "name": "iPod touch 7",
      "image": "/assets/images/iphones/iPod9,1.png"
    },
    {
      "identifier": "AudioAccessory1,2",
      "name": "HomePod (Unknown Model)",
      "image": "/assets/images/iphones/AudioAccessory1,2.png"
    },
```
## Get OTA Updates

To get all the OTA updates for a particular iDevices, you will need to know the firmware identifier. The endpoint for this request is;
> /ota/{identifier}

For example if your device is the Pad Pro (12.9-inch) (6th generation), then the firmware identifier is iPad14,6. You should get a response like this;
```
{
  "deviceName": "iPad Pro (12.9-inch) (6th generation)",
  "image": "/assets/images/iphones/iPad14,6.png",
  "identifier": "iPad14,6",
  "releases": [
    {
      "version": "9.9.17.4.1 (21E6236)",
      "buildid": "21E6236",
      "status": "signed",
      "releaseDate": "March 21, 2024",
      "type": "Beta",
      "prerequisiteversion": "",
      "prerequisitebuildid": "()"
    },
    {
      "version": "9.9.17.4.1 (21E236)",
      "buildid": "21E236",
      "status": "signed",
      "releaseDate": "March 21, 2024",
      "type": "Normal release",
      "prerequisiteversion": "",
      "prerequisitebuildid": "()"
    },
```
### Geeting a specific OTA update build
Apple firmware version has a specific buildid. To get information for a specific OTA update build id, you will use 
> /ota/{identifier}/{buildid}?prerequisite={?prerequisitebuildid}

With OTA updates, you will need to have a specific build (prerequisitebuildid} before you can update to a certain newer version. 
>[!NOTE]
> It should be noted that parsing the prerequisite query parameter is very important when fetching OTA firmware for a particular buildid. Even if the prerequisitebuildid is not available, make sure the query parameter is there.

Using this endpoint should output;
```
{
  "deviceName": "iPad Pro (12.9-inch) (6th generation)",
  "image": "/assets/images/iphones/iPad14,6.png",
  "identifier": "iPad14,6",
  "version": "9.9.17.2",
  "os": "iPadOS",
  "buildid": "21C62",
  "status": [
    "unsigned"
  ],
  "release_date": "2023-12-11",
  "update_date": "2023-12-03",
  "filesize": "5.60 GB",
  "filename": "eb013325201f6e67f5644d4a610b20d7e48272b6.zip",
  "ota_link": "https://updates.cdn-apple.com/2023FallFCS/patches/042-36585/9E312096-19E5-4A1A-8231-899D39C645DD/com_apple_MobileAsset_SoftwareUpdate/eb013325201f6e67f5644d4a610b20d7e48272b6.zip"
}
```
## Getting IPSW firmware
You can get IPSW firmware for iPhones, iPads, Macs and other iDevices using the following endpoint:
### All ipsw for a given devices
> /ipsw/{identifier}

You will get responses like 
```

```
{
  "deviceName": "iPad Pro (12.9-inch) (6th generation)",
  "image": "/assets/images/iphones/iPad14,6.png",
  "identifier": "iPad14,6",
  "releases": [
    {
      "version": "17.4.1",
      "buildid": "21E236",
      "status": "signed",
      "releaseDate": "March 21, 2024"
    },
    {
      "version": "17.4",
      "buildid": "21E219",
      "status": "signed",
      "releaseDate": "March 5, 2024"
    },
    {
      "version": "17.3.1",
      "buildid": "21D61",
      "status": "signed",
      "releaseDate": "February 8, 2024"
    },
    {
      "version": "17.3",
      "buildid": "21D50",
      "status": "unsigned",
      "releaseDate": "January 22, 2024"
    },
    {
      "version": "17.2",
      "buildid": "21C62",
      "status": "unsigned",
      "releaseDate": "December 11, 2023"
    },
```
### Geeting details for a specific buildid

>/ipsw/{identifier}/{buildid}

You should get a response for identifier iPad14,6 and buildid 21E236 as:
```
{
  "deviceName": "iPad Pro (12.9-inch) (6th generation)",
  "image": "/assets/images/iphones/iPad14,6.png",
  "identifier": "iPad14,6",
  "version": "17.4.1",
  "os": "iPadOS",
  "buildid": "21E236",
  "status": [
    "signed"
  ],
  "release_date": "2024-03-21",
  "update_date": "2024-03-17",
  "filesize": "7.16 GB",
  "filename": "iPad14,3,iPad14,4,iPad14,5,iPad14,6_17.4.1_21E236_Restore.ipsw",
  "sha1sum": "894b7c8718622c2a69a12206978b29ef166c20cc",
  "sha256sum": "dc9f5801c230daacc845693d2f6867164e227208c6c15e74f5668ef8b9d313d1",
  "md5sum": "5893b509ea67be371993bcf2dc8eb31e",
  "ipsw_link": "https://updates.cdn-apple.com/2024WinterFCS/fullrestores/052-73628/138EA47F-27F1-468D-8647-914EBC4BD700/iPad14,3,iPad14,4,iPad14,5,iPad14,6_17.4.1_21E236_Restore.ipsw"
}
```

## Accessing this API.
For the time being, this API is not hosted anywhere. Built you can clone this repository and test on localhost or install via cpanel shared hosting or deploy on any other platform like render, Vercel, etc
