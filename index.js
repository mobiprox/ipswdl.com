const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const genApiUrl = process.env.baseUrl; 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('WELCOME TO our vidstreaming Anime API');
});

// FIRMWARE INDEX
app.get('/index', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}`);
        const $ = cheerio.load(response.data); 
        
        const titles = [];
        $('h5').each((index, element) => {
            titles.push($(element).text().trim());
        });
        
        const images = [];
        $('div.relative img.mx-auto').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const texts = [];
        $('p.mb-5.text-base.text-gray-500').each((index, element) => {
            texts.push($(element).text());
        });

        const ota = [];
        $('a#ota').each((index, element) => {
            const href = $(element).attr('href');
            ota.push(href);
        });
     
        const ipsw = [];
        $('a#ipsw').each((index, element) => {
            const href = $(element).attr('href');
            ipsw.push(href);
        });

        res.json({
            firmware: titles.map((title, index) => {
                return {
                    ota: ota[index],
                    ipsw: ipsw[index],
                    title: title,
                    image: images[index],
                    text: texts[index]
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// iPhones IPSW
app.get('/devices/iphone', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}/iphones-ipsw`);
        const $ = cheerio.load(response.data); 

        const deviceNames = [];
        $('p.text-sm.font-medium.text-gray-900.truncate').each((index, element) => {
            deviceNames.push($(element).text().trim());
        });

        const images = [];
        $('img.w-24.h-auto.rounded-full').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const identifiers = [];
        $('p.text-sm.text-gray-500.truncate').each((index, element) => {
            identifiers.push($(element).text().trim());
        });

        res.json({
            devices: deviceNames.map((name, index) => {
                return {
                    identifier: identifiers[index],
                    name: name,
                    image: images[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// iPads

app.get('/devices/ipad', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}/ipads-ipsw`);
        const $ = cheerio.load(response.data); 

        const deviceNames = [];
        $('p.text-sm.font-medium.text-gray-900.truncate').each((index, element) => {
            deviceNames.push($(element).text().trim());
        });

        const images = [];
        $('img.w-24.h-auto.rounded-full').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const identifiers = [];
        $('p.text-sm.text-gray-500.truncate').each((index, element) => {
            identifiers.push($(element).text().trim());
        });
        res.json({
            devices: deviceNames.map((name, index) => {
                return {
                    identifier: identifiers[index],
                    name: name,
                    image: images[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});


// macBooks
app.get('/devices/mac', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}/mac`);
        const $ = cheerio.load(response.data); 

        const deviceNames = [];
        $('p.text-sm.font-medium.text-gray-900.truncate').each((index, element) => {
            deviceNames.push($(element).text().trim());
        });

        const images = [];
        $('img.w-24.h-auto.rounded-full').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const identifiers = [];
        $('p.text-sm.text-gray-500.truncate').each((index, element) => {
            identifiers.push($(element).text().trim());
        });
        res.json({
            devices: deviceNames.map((name, index) => { 
                return {
                    identifier: identifiers[index],
                    name: name,
                    image: images[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// AppleTV
app.get('/devices/appletv', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}/appletv`);
        const $ = cheerio.load(response.data); 

        const deviceNames = [];
        $('p.text-sm.font-medium.text-gray-900.truncate').each((index, element) => {
            deviceNames.push($(element).text().trim());
        });

        const images = [];
        $('img.w-24.h-auto.rounded-full').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const identifiers = [];
        $('p.text-sm.text-gray-500.truncate').each((index, element) => {
            identifiers.push($(element).text().trim());
        });
        res.json({
            devices: deviceNames.map((name, index) => { 
                return {
                    identifier: identifiers[index],
                    name: name,
                    image: images[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// APPLE Watch
app.get('/devices/watch', async (req, res) => { 
    try {
        const response = await axios.get(`${genApiUrl}/applewatch`);
        const $ = cheerio.load(response.data); 

        const deviceNames = [];
        $('p.text-sm.font-medium.text-gray-900.truncate').each((index, element) => {
            deviceNames.push($(element).text().trim());
        });

        const images = [];
        $('img.w-24.h-auto.rounded-full').each((index, element) => {
            images.push($(element).attr('src'));
        });

        const identifiers = [];
        $('p.text-sm.text-gray-500.truncate').each((index, element) => {
            identifiers.push($(element).text().trim());
        });
        res.json({
            devices: deviceNames.map((name, index) => { 
                return {
                    identifier: identifiers[index],
                    name: name,
                    image: images[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});


// OTAs List
app.get('/ota/:identifier', async (req, res) => { 
    const { identifier } = req.params;
    try {
        const response = await axios.get(`${genApiUrl}/ota/${identifier}`);
        const $ = cheerio.load(response.data); 

        const deviceName = $('span#device').text().trim();

        const images = $('meta[property="og:image"]').attr('content');


        const releaseDate = [];
        $('td#reldate').each((index, element) => {
            releaseDate.push($(element).text().trim());
        });

        const versions = [];
        $('#ios').each((index, element) => {
            versions.push($(element).text().trim());
        });

        const releaseType = [];
        $('mark#type').each((index, element) => {
            releaseType.push($(element).text().trim());
        });

        const prerequisiteversion = [];
        $('span#prerequisiteversion').each((index, element) => {
            prerequisiteversion.push($(element).text().trim());
        });

        const prerequisitebuildid = [];
        $('span#prerequisitebuildid').each((index, element) => {
            prerequisitebuildid.push($(element).text().trim());
        });

        const buildid = [];
        $('span#buildid').each((index, element) => {
            buildid.push($(element).text().trim());
        });

        const status = [];
        // Push status for each release
        $('span.flex-0 img#status').each((index, element) => {
            const src = $(element).attr('src');
            if (src.includes('cross.svg')) {
                status.push('unsigned');
            } else if (src.includes('checked.svg')) {
                status.push('signed');
            }
        });
const minLength = Math.min(buildid.length, versions.length, releaseDate.length, releaseType.length, prerequisiteversion.length, prerequisitebuildid.length);
const validStatus = status.slice(0, minLength);


        res.json({
            deviceName: deviceName,
            image: images,
            identifier: identifier,
            releases: versions.slice(0, minLength).map((version, index) => { 
                return {
                    version: version,
                    buildid: buildid[index],
                    status: validStatus[index], 
                    releaseDate: releaseDate[index],
                    type: releaseType[index],
                    prerequisiteversion: prerequisiteversion[index],
                    prerequisitebuildid: prerequisitebuildid[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// Get all IPSW firmware for a given identifier
app.get('/ipsw/:identifier', async (req, res) => { 
    const { identifier } = req.params;
    try {
        const response = await axios.get(`${genApiUrl}/ipsw/${identifier}`);
        const $ = cheerio.load(response.data); 

        const deviceName = $('span#device').text().trim();

        const images = $('meta[property="og:image"]').attr('content');


        const releaseDate = [];
        $('td#reldate').each((index, element) => {
            releaseDate.push($(element).text().trim());
        });

        const versions = [];
        $('#version').each((index, element) => {
            versions.push($(element).text().trim());
        });

        const buildid = [];
        $('span#buildid').each((index, element) => {
            buildid.push($(element).text().trim());
        });

        const status = [];
        // Push status for each release
        $('span.flex-0 img#status').each((index, element) => {
            const src = $(element).attr('src');
            if (src.includes('cross.svg')) {
                status.push('unsigned');
            } else if (src.includes('checked.svg')) {
                status.push('signed');
            }
        });
const minLength = Math.min(buildid.length, versions.length, releaseDate.length);
const validStatus = status.slice(0, minLength);


        res.json({
            deviceName: deviceName,
            image: images,
            identifier: identifier,
            releases: versions.slice(0, minLength).map((version, index) => { 
                return {
                    version: version,
                    buildid: buildid[index],
                    status: validStatus[index], 
                    releaseDate: releaseDate[index],
                };
            })
        });
    } catch (error) {
        res.json(error);
    }
});

// Download IPSW firmware from given firmware identifier and the buildid
app.get('/ipsw/:identifier/:buildid', async (req, res) => { 
    const { identifier } = req.params;
    const { buildid } = req.params;
    try {
        const response = await axios.get(`${genApiUrl}/ipsw/${identifier}/${buildid}`);
        const $ = cheerio.load(response.data); 

        const deviceName = $('span#device').text().trim();
        const version = $('span#version').text().trim();
        const os = $('span#os').text().trim();
        const build = $('span#buildid').text().trim();
        const images = $('meta[property="og:image"]').attr('content');

        const status = [];
        // Push status for each release
        $('img#status').each((index, element) => {
            const src = $(element).attr('src');
            if (src.includes('cross.svg')) {
                status.push('unsigned');
            } else if (src.includes('checked.svg')) {
                status.push('signed');
            }
        });
        const reldate = $('#reldate').text().trim();
        const updateDate = $('#updateDate').text().trim();
        const sha1sum = $('#sha1sum').text().trim();
        const sha256sum = $('#sha256sum').text().trim();
        const md5sum = $('#md5sum').text().trim();
        const filesize = $('#filesize').text().trim();
        const filename = $('#filename').text().trim();
        const link =$('a#ipsw_link').attr('href');
        res.json({
            deviceName: deviceName,
            image: images,
            identifier: identifier,
            version: version,
            os: os,
            buildid: build,
            status: status,
            release_date: reldate,
            update_date: updateDate,
            filesize: filesize,
            filename: filename,
            sha1sum: sha1sum,
            sha256sum: sha256sum,
            md5sum: md5sum,
            ipsw_link: link,

        });
    } catch (error) {
        res.json(error);
    }
});

// Download OTA firmware from given firmware identifier and the buildid and prerequisitebuidid
app.get('/ota/:identifier/:buildid', async (req, res) => { 
    const { identifier } = req.params;
    const { buildid } = req.params;
    const { prerequisite } = req.query;
    try {
        const response = await axios.get(`${genApiUrl}/ota/${identifier}/${buildid}?prerequisite=${prerequisite}`);
        const $ = cheerio.load(response.data); 

        const deviceName = $('span#device').text().trim();
        const version = $('span#version').text().trim();
        const os = $('span#os').text().trim();
        const build = $('span#buildid').text().trim();
        const images = $('meta[property="og:image"]').attr('content');

        const status = [];
        // Push status for each release
        $('img#status').each((index, element) => {
            const src = $(element).attr('src');
            if (src.includes('cross.svg')) {
                status.push('unsigned');
            } else if (src.includes('checked.svg')) {
                status.push('signed');
            }
        });
        const reldate = $('#reldate').text().trim();
        const updateDate = $('#updateDate').text().trim();
        const filesize = $('#filesize').text().trim();
        const filename = $('#filename').text().trim();
        const link =$('a#ota_link').attr('href');
        res.json({
            deviceName: deviceName,
            image: images,
            identifier: identifier,
            version: version,
            os: os,
            buildid: build,
            status: status,
            release_date: reldate,
            update_date: updateDate,
            filesize: filesize,
            filename: filename,
            ota_link: link,

        });
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
