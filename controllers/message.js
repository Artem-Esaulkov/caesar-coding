const Message = require('../models/message');
const smallAlphabet = 'abcdefghijklmnopqrstuvwxyz';
const bigAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeMessage(mes, rot) {
  let resultMessage = '';
  for (let i = 0; i < mes.length; i++) {
    if (!(smallAlphabet.includes(mes[i])) && !(bigAlphabet.includes(mes[i]))) {
      resultMessage += mes[i];
      continue;
    };
    for (let j = 0; j < smallAlphabet.length; j++) {
      if (mes[i] === smallAlphabet[j] && ((j + rot) < smallAlphabet.length)) {
        resultMessage += smallAlphabet[j + rot];
      } else if(mes[i] === smallAlphabet[j] && ((j + rot) >= smallAlphabet.length)) {
        resultMessage += smallAlphabet[(j + rot) - smallAlphabet.length];
      }
    }
    for (let k = 0; k < bigAlphabet.length; k++) {
      if (mes[i] === bigAlphabet[k] && ((k + rot) < bigAlphabet.length)) {
        resultMessage += bigAlphabet[k + rot];
      } else if(mes[i] === bigAlphabet[k] && ((k + rot) >= bigAlphabet.length)) {
        resultMessage += bigAlphabet[(k + rot) - bigAlphabet.length];
      }
    }
  }
  return resultMessage;
}

function decodeMessage(mes, rot) {
  let resultMessage = '';
  for (let i = 0; i < mes.length; i++) {
    if (!(smallAlphabet.includes(mes[i])) && !(bigAlphabet.includes(mes[i]))) {
      resultMessage += mes[i];
      continue;
    };
    for (let j = 0; j < smallAlphabet.length; j++) {
      if (mes[i] === smallAlphabet[j] && ((j - rot) >= 0)) {
        resultMessage += smallAlphabet[j - rot];
      } else if(mes[i] === smallAlphabet[j] && ((j - rot) < 0)) {
        resultMessage += smallAlphabet[(j - rot) + smallAlphabet.length];
      }
    }
    for (let k = 0; k < bigAlphabet.length; k++) {
      if (mes[i] === bigAlphabet[k] && ((k - rot) >= 0)) {
        resultMessage += bigAlphabet[k - rot];
      } else if(mes[i] === bigAlphabet[k] && ((k - rot) < 0)) {
        resultMessage += bigAlphabet[(k - rot) + bigAlphabet.length];
      }
    }
  }
  return resultMessage;
}

module.exports.postMessage = (req, res) => {
  const { message, rot } = req.body;
  const newMessage = encodeMessage(message, rot);
  Message.create({ message: newMessage, rot, date: new Date() })
    .then((mes) => res.status(200).send({ message: mes.message }))
    .catch((err) => res.send({ err }));
};

module.exports.getMessage = (req, res) => {
  const { message, rot } = req.params;
  const newMessage = decodeMessage(message, rot);
  Message.create({ message: newMessage })
    .then((mes) => res.status(200).send({ message: mes.message }))
    .catch((err) => res.send({ err }));
};

module.exports.getStats = (req, res) => {
  let results = [];
  for (let i = 0; i <= 26; i++) {
    Message.find({ rot: i })
    .then((stats) => {
      if (stats.length > 0) {
        results.push({rot: i, usages: stats.length})
      }
    })
    .catch((err) => {
      return res.status(500).send({ err });
    });
  };
  Message.find({})
  .then(() => res.send(results))
  .catch((err) => {
    return res.status(500).send({ err });
  });
};
