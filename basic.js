// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const lang = req.body.queryResult.languageCode;
  let responseText = '';

  if (intent === 'Greet') {
    responseText = {
      en: "Hello my dear! Granny's here to help you learn!",
      hi: "नमस्ते मेरे बच्चे! दादी तुम्हें पढ़ाने के लिए तैयार है!",
      bn: "নমস্কার সোনা! ঠাকুমা শেখাতে একেবারে প্রস্তুত!"
    }[lang] || "Hello, my dear!";
  } else if (intent === 'FunFact') {
    responseText = {
      en: "Did you know? Butterflies taste with their feet!",
      hi: "क्या तुम जानते हो? तितलियाँ अपने पैरों से स्वाद लेती हैं!",
      bn: "তুই জানিস? প্রজাপতিরা পায়ের মাধ্যমে স্বাদ বোঝে!"
    }[lang];
  } else if (intent === 'SimpleMath') {
    const question = req.body.queryResult.queryText;
    if (question.includes('2') && question.includes('2')) {
      responseText = {
        en: "2 plus 2 is 4! You're so smart!",
        hi: "2 और 2 मिलाकर होते हैं 4! शाबाश!",
        bn: "২ আর ২ মিলিয়ে হয় ৪! তুই তো একেবারে জিনিয়াস!"
      }[lang];
    } else {
      responseText = {
        en: "Let’s try solving that together!",
        hi: "चलो मिलकर हल करते हैं!",
        bn: "চল একসাথে মিলে করি!"
      }[lang];
    }
  }

  res.json({ fulfillmentText: responseText });
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));
