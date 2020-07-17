const n = 25;
let divs = [];
let divs2 = [];
let divs3 = [];
let dup = [];
let speed;
let sleepTime;
let isSorting;
window.onload = () => {
    let bubble = document.getElementById("bubble");
    let select = document.getElementById("selection");
    let insert = document.getElementById("insertion");
    speed = document.getElementById('speed');
    speed.value = '500';
    sleepTime = 200;
    for (let i = 0; i < n; ++i) {
        divs[i] = document.createElement("div");
        divs[i].classList.add("bars");
        divs[i].style.position = 'absolute';
        divs2[i] = document.createElement("div");
        divs2[i].classList.add("bars");
        divs2[i].style.position = 'absolute';
        divs3[i] = document.createElement("div");
        divs3[i].classList.add("bars");
        divs3[i].style.position = 'absolute';
        bubble.appendChild(divs[i]);
        select.appendChild(divs2[i]);
        insert.appendChild(divs3[i]);
    }
    reset();
}

function changeSpeed() {
    sleepTime = 1500 - Number.parseInt(speed.value);
    console.log(sleepTime);
}

async function start() {
    if (isSorting === true)
        return;
    isSorting = true;
    const sorting = Promise.all(
        [
            bubbleSort(),
            selectionSort(),
            insertionSort()
        ]
    );
    await sorting;
    isSorting = false;
}

function reload() {
    if (isSorting === true)
        return;
    for (let i = 0; i < n; ++i) {
        initialSetup();
    }
}

function initialSetup() {
    for (let i = 0; i < n; ++i) {
        divs[i].style.height = dup[i];
        divs2[i].style.height = dup[i];
        divs3[i].style.height = dup[i];
        divs[i].style.left = `${i*10}px`;
        divs2[i].style.left = `${i*10}px`;
        divs3[i].style.left = `${i*10}px`;
        divs[i].style.top = `0px`;
        divs2[i].style.top = `0px`;
        divs3[i].style.top = `0px`;
        divs[i].style.backgroundColor = 'white';
        divs2[i].style.backgroundColor = 'white';
        divs3[i].style.backgroundColor = 'white';

    }
}

function reset() {
    if (isSorting === true)
        return;
    for (let i = 0; i < n; ++i) {
        dup[i] = `${Math.floor(Math.random() * 250)}px`;
    }
    initialSetup();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(j, i, k) {
    if (k == 0) {
        let temp = divs[j].style.left;
        divs[j].style.left = divs[i].style.left;
        divs[i].style.left = temp;
        temp = divs[j];
        divs[j] = divs[i];
        divs[i] = temp;
    } else {
        let temp = divs2[j].style.left;
        divs2[j].style.left = divs2[i].style.left;
        divs2[i].style.left = temp;
        temp = divs2[j];
        divs2[j] = divs2[i];
        divs2[i] = temp;
    }

}

async function bubbleSort() {
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < (n - i - 1); ++j) {
            if (isSorting === false)
                return;
            divs[j].style.backgroundColor = '#ffffff44';
            divs[j + 1].style.backgroundColor = '#ffffff44';
            await sleep(sleepTime);
            let jColor = Number.parseInt(divs[j].style.height.replace('px', ''));
            let jPColor = Number.parseInt(divs[j + 1].style.height.replace('px', ''));
            if (jColor > jPColor) {
                divs[j].style.backgroundColor = 'cyan';
                divs[j + 1].style.backgroundColor = 'cyan';
                await sleep(sleepTime);
                swap(j, j + 1, 0);
            }
            divs[j].style.backgroundColor = '#ffffff';
            divs[j + 1].style.backgroundColor = '#ffffff';
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < n; ++i) {
        let small = Number.parseInt(divs2[i].style.height.replace('px', ''));
        divs2[i].style.backgroundColor = 'cyan';
        let pos = i;
        for (let j = i + 1; j < n; ++j) {
            if (isSorting === false)
                return;
            divs2[j].style.backgroundColor = '#ffffff44';
            await sleep(sleepTime);
            let jColor = Number.parseInt(divs2[j].style.height.replace('px', ''));
            if (small > jColor) {
                small = jColor;
                if (pos != i)
                    divs2[pos].style.backgroundColor = '#ffffff';
                pos = j;
                divs2[j].style.backgroundColor = 'cyan';
            } else {
                divs2[j].style.backgroundColor = '#ffffff';
            }
        }
        if (pos != i) {
            swap(i, pos, 1);
        }
        divs2[i].style.backgroundColor = '#ffffff';
        divs2[pos].style.backgroundColor = '#ffffff';
    }
}

async function insertionSort() {
    for (let i = 1; i < n; ++i) {
        divs3[i].style.backgroundColor = 'cyan';
        let keyDiv = divs3[i];
        let key = Number.parseInt(divs3[i].style.height.replace('px', ''));
        await sleep(sleepTime);
        divs3[i].style.top = `-${key+1}px`;
        let j = i - 1;
        let last = divs3[i].style.height;
        if (isSorting === false)
            return;
        while (j > -1 && key < Number.parseInt(divs3[j].style.height.replace('px', ''))) {
            await sleep(sleepTime);
            divs3[j + 1] = divs3[j];
            divs3[j + 1].style.left = `${(j+1)*10}px`
            j--;
        }
        divs3[j + 1] = keyDiv;
        divs3[j + 1].style.top = '0px';
        divs3[j + 1].style.left = `${(j+1)*10}px`
        divs3[j + 1].style.backgroundColor = 'white';
    }
}