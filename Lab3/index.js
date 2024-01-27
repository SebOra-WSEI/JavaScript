document.addEventListener('keypress', onKeyPress);

const recordBtn = document.querySelector("#recordBtn");
recordBtn.addEventListener('click', record)

let isRecording = false;
let index = 1;
let actualRecords = [];
let recorded = [];

const keys = new Map();
keys.set("q", "boom");
keys.set("w", "tom");
keys.set("e", "hihat");
keys.set("r", "kick");
keys.set("t", "openhat");
keys.set("y", "ride");
keys.set("u", "snare");
keys.set("i", "clap");
keys.set("o", "tink");

const showRecords = () => {
  const recordsList = document.querySelector('.records');

  recorded.map(r => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const li = document.createElement('li');

    li.textContent = r.text;
    li.id = 'recorded'
    btn.textContent = "Play"
    btn.className = "playBtn";
    btn.addEventListener('click', () => {
      r.sound.forEach(s => {
        playSound(s);
        setInterval(() => {
          playSound(s);
        }, 500);
      });
    });

    li.appendChild(btn);
    div.appendChild(li);

    recordsList.appendChild(li);
  });
}

const playSound = (sound) => {
  const audioTag = document.querySelector(`#${sound}`);
  audioTag.currentTime = 0;
  audioTag.play();
}

function record() {
  isRecording = !isRecording;

  const recording = () => {
    recordBtn.textContent = 'Stop Recording';
    recordBtn.classList.add('recording');
  }

  const notRecording = () => {
    recordBtn.textContent = 'Record';
    recordBtn.classList.remove('recording');
    recorded.push({
      text: `Record ${index}`,
      sound: actualRecords
    });

    index++;
    actualRecords = [];

    showRecords();
  }

  isRecording ? recording() : notRecording()
};

function onKeyPress(evt) {
  const key = evt.key;
  const sound = keys.get(key);

  if (sound === undefined) {
    alert(`Key "${key}" not defined`);
    return;
  }

  isRecording && actualRecords.push(sound)

  playSound(sound)
}