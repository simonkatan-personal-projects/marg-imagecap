let capture;
let imgTime;
let images;
let canvas;
let c_image;
let num_seconds;
let slider;
let clear_button;
let download_button;
let pause_button;
let isPaused;

function setup()
{
  canvas = createCanvas(1800, 800);
  capture = createCapture(VIDEO);

  capture.hide();

	num_seconds = 5;

	imgTime = millis();
	images = [];

	isPaused = true;

	slider = createSlider(0, 600, num_seconds - 0.1, 1);
  slider.position(300, 10);
  slider.style('width', '300px');

	pause_button = createButton('toggle pause');
	pause_button.position(160, 40);
	pause_button.mousePressed(pause);

	clear_button = createButton('clear');
  clear_button.position(20, 40);
  clear_button.mousePressed(emptyImages);

	download_button = createButton('download');
	download_button.position(80, 40);
	download_button.mousePressed(downloadImages);
	noStroke();

}

function draw()
{

	num_seconds = slider.value();

	if(isPaused)
	{
		background(150);
	}
	else
	{
		background(255,100,100);
	}

	capture.get(0, 0, capture.width, capture.height);
	image(capture, 100 + capture.width , 100, capture.width, capture.height);

	if(c_image)
	{
		fill(255);
		image(c_image, 50, 100, capture.width, capture.height);
	}

	if(millis() > imgTime && !isPaused)
	{
		imgTime = millis() + num_seconds * 1000;
		c_image = capture.get(0, 0, capture.width, capture.height);
		images.push(c_image);
	}

	fill(0);
	text("number of images: " +images.length, 20,20);
	text("seconds between shots: " + num_seconds, 300,40);

}

function emptyImages()
{
	images = [];
	imgTime = millis();
}

function downloadImages()
{

	isPaused = true;
	for(let i = 0; i < images.length; i++)
	{
		images[i].save("image_" + nf(i,3) , 'png');
	}

	emptyImages();
}

function pause()
{
	isPaused = !isPaused;
}
