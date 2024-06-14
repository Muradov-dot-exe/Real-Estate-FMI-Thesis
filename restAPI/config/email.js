const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmailNotification = (email, offer) => {
  const mailText = `
    The offer you have favorited has been updated. New details:
    - id: ${offer.id}
    - area: ${offer.area}
    - address: ${offer.address}
    - city: ${offer.city}
    - image: ${offer.image}
    - type: ${offer.type}
    - floorspace: ${offer.floorspace}
    - beds: ${offer.beds}
    - baths: ${offer.baths}
    - price: ${offer.price}
    - parking: ${offer.parking}
    - construction: ${offer.construction}
    - description: ${offer.description}
    - createdAt: ${offer.createdAt}
    - updatedAt: ${offer.updatedAt}
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `Offer Updated: ${offer.city}, ${offer.type}`,
    text: mailText,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendEmailNotification };
