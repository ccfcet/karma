const loopThroughMenuItems = require('./loopThroughMenuItems');

const processMenuElement = function (
  menuElement,
  index,
  menuElements,
  iteratee,
) {
  return new Promise((resolve, reject) => {
    try {
      let newMenuElement = menuElement;
      const newMenuElements = menuElements;
      if (newMenuElement.children != null) {
        loopThroughMenuItems(newMenuElement.children, iteratee)
          .then((result) => {
            newMenuElement.children = result;
            newMenuElement = iteratee(newMenuElement);
            newMenuElements[index] = newMenuElement;
            resolve(newMenuElements);
          });
      } else {
        newMenuElement = iteratee(newMenuElement);
        newMenuElements[index] = newMenuElement;
        resolve(newMenuElements);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = processMenuElement;
