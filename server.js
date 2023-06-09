const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create notification endpoint
app.post('/create-notification', async (req, res) => {
  try {
    const { title, image } = req.body;

    // Perform any necessary validation or processing of the title and image data here

    // Prepare the notification payload
    const notification = {
      app_id: 'f21c9e28-36d9-4a4e-9a27-397b8b7b59ff',
      contents: { en: title },
      included_segments: ['Subscribed Users'],
    };

    // Attach the image if provided
    if (image) {
      const imageBuffer = Buffer.from(image, 'base64');
      notification.big_picture = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    }

    // Send the push notification using OneSignal API
    const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'NmNkZGQwOTUtMmU2ZS00NzU0LWE0NTYtMDVmNjZjMmY1OTVk',
      },
    });

    console.log('Push notification sent:', response.data);

    res.status(200).json({ success: true, message: 'Push notification sent successfully' });
  } catch (error) {
    console.error('Error sending push notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send push notification' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
