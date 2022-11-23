
      const list = document.querySelector('ul');
      const input = document.querySelector('input');
      const button = document.querySelector('button');
      let tracker = document.querySelector('div.tracker')
      let body = document.querySelector('body');

      document.addEventListener('DOMContentLoaded', trackProgress)

      button.addEventListener('click', () => {
          addItem();
        })

      input.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') addItem();
       })

      function trackProgress() {
          tracker.textContent = `${countChecks()}/${countItems()}`;
          if (countItems() === countChecks() && countChecks() !== 0) {
              confirmReset();
          }
      }

      function confirmReset () {
        if (confirm('You finished your list!\nWould you like to remove all items?')) {
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            trackProgress();
        }
      }


      function setAttributes(element, attributes) {
          for (let key in attributes) {
              element.setAttribute(key, attributes[key]);
          }
      }


      function addItem() {

          const myItem = input.value;
          input.value = "";

          let listItem = document.createElement('li');
          let span = document.createElement('span');
          let deleteButton = document.createElement('button');
          let checkbox = document.createElement('input');
          
          listItem.appendChild(checkbox);
          listItem.appendChild(span);
          listItem.appendChild(deleteButton);

          span.textContent = myItem;
          deleteButton.textContent = 'X';

          list.appendChild(listItem);

          deleteButton.addEventListener('click', () => {
              list.removeChild(listItem);
              trackProgress();
          })

          deleteButton.setAttribute('class', 'delete-button');

          span.setAttribute('class', 'text');

          listItem.setAttribute('class', 'list-item')

          setAttributes(checkbox, {'class': 'checkbox-round', 'name': 'checkbox', 'type': 'checkbox'});
          checkbox.addEventListener('change', trackProgress)

          trackProgress();
          input.focus();
      }


      function countItems() {
          return list.querySelectorAll('li').length;
      }


      function countChecks() {
        let checkboxes = document.querySelectorAll('input[name=checkbox]');
        let enableCheckMark = [];

        enableCheckMark =
          Array.from(checkboxes)
          .filter(i => i.checked)
          .map(i => i.value);

        return enableCheckMark.length;
      }