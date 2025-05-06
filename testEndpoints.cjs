const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// === 1. SEND RESET EMAIL ===
async function testResetEmail() {
  try {
    const res = await axios.post("https://hw6-email-and-images.onrender.com/auth/send-reset-email", {
      email: "alice@example.com",
    });
    console.log("✅ send-reset-email:", res.data.message);
  } catch (err) {
    console.error("❌ send-reset-email:", err.response?.data || err.message);
  }
}

// === 2. UPLOAD CONTACT WITH PHOTO ===
async function testUploadContact() {
  try {
    const form = new FormData();
    form.append("name", "Boby");
    form.append("email", "boby@mail.com");
    form.append("phone", "380991111111");
    form.append("photo", fs.createReadStream("./temp/1743440113084_838.webp"));

    const res = await axios.post("https://hw6-email-and-images.onrender.com/contacts", form, {
      headers: form.getHeaders(),
    });
    console.log("✅ upload contact:", res.data);
  } catch (err) {
    console.error("❌ upload contact:", err.response?.data || err.message);
  }
}

// === RUN ALL TESTS ===
(async () => {
  console.log("=== Testing Endpoints ===");
  await testResetEmail();
  await testUploadContact();
})();
