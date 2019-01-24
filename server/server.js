const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const { Translate } = require('@google-cloud/translate');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));

const projectId = process.env.PROJECT_ID;

const translate = new Translate({
  projectId,
});

const detectLanguage = async (text) => {
  try {
    const results = await translate.detect(text);
    const languageCode = results[0].language;
    return languageCode;
  } catch (err) {
    console.log('ERROR: ', err);
    return null;
  }
};

const getLanguageName = async (langCode) => {
  try {
    const results = await translate.getLanguages();
    const language = results[0].find(lang => lang.code === langCode);
    return language.name;
  } catch (err) {
    console.log('ERROR: ', err);
    return null;
  }
};

const translateText = async (text, target) => {
  try {
    const results = await translate.translate(text, target);
    const translation = results[0];
    return translation;
  } catch (err) {
    console.log('ERROR: ', err);
    return null;
  }
};

app.post('/api/translate', async (req, res) => {
  const { body: { text } } = req;
  const languageCode = await detectLanguage(text);
  const language = await getLanguageName(languageCode);
  const translation = await translateText(text, 'en');
  res.send(
    { text, lang: language, trans: translation },
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
