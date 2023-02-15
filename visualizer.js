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

function show_bars(element, array)
{
	let max = find_max(array);
	let digit_count = number_digit_count(max);
	let bars_width = digit_count * PX_PER_DIGIT;
	console.log(bars_width);

	for (let i = 0; i < array.length; i++) {
		element.appendChild(create_bar(array[i], bars_width, max));
	}
}

function visualize(id, array) {
	let element = document.querySelector(id);
	console.log(element);
	
	show_bars(element, array);
}