const PX_PER_DIGIT = 11;

const DELAY_MS = 400;

function find_max(array) {
	let max = array[0];
	for (let i = 1; i < array.length; i++) {
		max = Math.max(max, array[i]);
	}
	return max;
}

function number_digit_count(n)
{
	return Math.floor(Math.log10(Math.abs(n))) + 1;
}

function get_percent(x, y)
{
	return ((x / y) * 100).toFixed(2);
}

function swap(arr, firstIndex, secondIndex, bars)
{
	var temp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = temp;

	swapElements(bars[firstIndex], bars[secondIndex]);
}

/*
	swap two bars size(height) and text
 */
async function swapElements(el1, el2)
{
	let el1_height = el1.style.height;
	let el1_text = el1.textContent;

	el1.style.height = el2.style.height;
	el2.style.height = el1_height;
	
	el1.textContent = el2.textContent;
	el2.textContent = el1_text;

}

function highlight_bar(bar, color)
{
	bar.style.backgroundColor = color;
}

function dehighlight_bar(bar)
{
	bar.style.backgroundColor = "white";
}

function create_bar(n, width, max)
{
	let div = document.createElement("div");
	div.classList.add("bar");
	let percent = get_percent(n, max);
	let height = percent < 2 ? 2 : percent;
	div.setAttribute("style", "width : " + width + "px; height : " + height + "%");
		
	let label = document.createElement("p");
	label.textContent = n;

	div.appendChild(label);

	return div;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function show_bars(element, array)
{
	let max = find_max(array);
	let digit_count = number_digit_count(max);
	let bars_width = digit_count * PX_PER_DIGIT;

	for (let i = 0; i < array.length; i++) {
		element.appendChild(create_bar(array[i], bars_width, max));
	}
}

function visualize(id, array)
{
	let element = document.querySelector(id);
	console.log(element);
	
	show_bars(element, array);

	let bars = document.querySelectorAll(".bar");
	insertionSort(array, bars);
}

/* ====================== algorithms ======================== */


const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

async function bubbleSort(arr, bars, compare = defaultCompare) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compare(arr[j], arr[j + 1]) === Compare.BIGGER_THAN) {
				await sleep(DELAY_MS);
                swap(arr, j, j + 1, bars);
            }
        }
    }
}

async function selectionSort(arr, bars, compare = defaultCompare) {
    const { length } = arr;
    let minIndex;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i; j < length; j++) {
            if (compare(arr[minIndex], arr[j]) === Compare.BIGGER_THAN) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            swap(arr, i, minIndex, bars);
			await sleep(DELAY_MS);
        }
    }
}

async function insertionSort(arr, bars, compare = defaultCompare) {
    const { length } = arr;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = arr[i];
        while (j > 0 && compare(arr[j - 1], temp) === Compare.BIGGER_THAN) {
            arr[j] = arr[j - 1];
            j--;
			swap(arr, j + 1, j, bars);
			await sleep(DELAY_MS);
        }
        arr[j] = temp;
    }
}
