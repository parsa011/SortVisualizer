const PX_PER_DIGIT = 11;

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
    el1.style.backgroundColor = "red";
	el2.style.backgroundColor = "green";

	let el1_height = el1.style.height;
	let el1_text = el1.textContent;

	el1.style.height = el2.style.height;
	el2.style.height = el1_height;
	
	el1.textContent = el2.textContent;
	el2.textContent = el1_text;

	await Sleep(500 / 2);
					
	el1.style.backgroundColor = "white";
	el2.style.backgroundColor = "white";
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

function Sleep(ms) {
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
	bubbleSort(array, bars);
}

async function bubbleSort(arr, bars)
{
	var len = arr.length, i, j, stop;
	for (i = 0; i < len; i++){
		for (j = 0, stop = len - i; j < stop; j++){
			if (arr[j] > arr[j+1]){
				swap(arr, j, j + 1, bars);
				await Sleep(500 / 2);
			}
		}
	}
}