const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.1.0",
    author: "Mᴏʜᴀᴍᴍᴀᴅ Aᴋᴀsʜ",
    role: 0,
    shortDescription: "Owner information with video",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = 
`┌───[ 👤 OWNER PROFILE ]───
│ ❯ Name      : NIROB
│ ❯ Nickname  : Kakashi
│ ❯ Age       : 20
│ ❯ Education : api / JavaScript 🥰💔
│ ❯ Location  : Dhaka,Munshiganj
├───[ 🔗 CONTACT SYSTEM ]───
│ ❯ Facebook  : fb.com/nahad.nirob007
│ ❯ WhatsApp  : +8801744244119
└───────────────────────────`;

    const cacheDir = path.join(__dirname, "cache");
    const videoPath = path.join(cacheDir, "owner.mp4");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

    // এখানে তোমার ভিডিওর ডাইরেক্ট MP4 লিংক দাও
    const videoLink = "https://i.imgur.com/your_video_link.mp4";

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(videoPath)
        },
        event.threadID,
        () => {
          if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        },
        event.messageID
      );
    };

    request(encodeURI(videoLink))
      .pipe(fs.createWriteStream(videoPath))
      .on("close", send)
      .on("error", (err) => {
        console.error("Video Download Error:", err);
        api.sendMessage("ভিডিও পাঠাতে সমস্যা হয়েছে!", event.threadID, event.messageID);
      });
  }
};
