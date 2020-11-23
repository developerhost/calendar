'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      // 30
      // 29, 30
      // 28, 29, 30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function getCalendarBody() {
    const dates = []; // date: 日付, day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    //今月が表示されている場合のみ
    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
      //isTodayプロパティをtrueに上書き
    }


    return dates;
  }

  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  function clearCalendar() {
    // カレンダーをその月のみ表示
    const tbody = document.querySelector('tbody');

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function renderTitle() {
    //　月のタイトルを表示
    const title = `${year}/${String(month + 1).padStart(2, '0')}`; //一桁の時は0を与える ex.02
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
      // 処理をまとめる
      const dates = [
        ...getCalendarHead(),
        ...getCalendarBody(),
        ...getCalendarTail(),
      ];
      const weeks = [];
      const weeksCount = dates.length / 7;
  
      for (let i = 0; i < weeksCount; i++) {
        weeks.push(dates.splice(0, 7));
      }
  
      //htmlへ表示
      weeks.forEach(week => {
        const tr = document.createElement('tr');
        week.forEach(date => {
          const td = document.createElement('td');
  
          td.textContent = date.date;
          if (date.isToday) {
            td.classList.add('today');
          }
          if (date.isDisabled) {
            td.classList.add('disabled');
          }
  
          tr.appendChild(td);
        });
        document.querySelector('tbody').appendChild(tr);
      });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }

  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    } //前の月へ

    createCalendar();
  })
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }  //次の月へ

    createCalendar();
  })
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  })

  createCalendar();
}