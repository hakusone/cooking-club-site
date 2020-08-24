**Student Name**:  Your Name Here!

**NetID**: Your netId here (all lowercase)

> The start of all your assignments must begin with your name and student id so I can give you credit for your "submission".

# Assignment Outline for CS351/CS651

The following is explanatory text and should be removed from any submissions.

## Introduction

In CS351, CS651, and other web related classes that I teach we use GitHub as the mechanism to turn in assignments, exams, etc. Each student gets their own private GitHub repository that is shared with the instructor and possibly a TA or grader.

## README.md

All homework submissions are via commits to the students repository where the `README.md` forms an important part of your assignment solution. This file is written in *Markdown* and rendered as a nice HTML page by GitHub so I can easily check your submissions.

The following shows the outline of a typical assignment solution. You will need to use this general format for your submissions.

---

# Homework #N Solutions

## Question 1 (Headings and Screenshots)

Use level 2 headings `##` in *markdown* which translates to `<h2>` in HTML for each question.

### (a)

If the question has a subpart use a level 3 `###` heading in *markdown* which translates to `<h3>`.

### (b)

Many times you'll be asked to suppy a screen shot of your work. You'll use a screen capture program and save in a `png` or similar format in a subdirectory of your repository. *Markdown* makes it easy to include images. Caution: Windows isn't picky about the "cases" of file names and file extensions, however other operating systems such as Linux are, and hence most remote repositories such as GitHub are. Make sure to be consistent with your file names and references in Markdown.

Here is an example screen shot showing a browser window and developer tools:

![Screen Shot Example](images/ScreenShotEx.png)

## Question 2 (Code Samples)

Other questions may ask you to show a specific section of your code. You will submit nicely formated and syntax highlighted code with the help of *Markdown* (and GitHub rendering). Do **not** submit a *screen shot* of your code in these cases!

### (a) JavaScript Example

Don't worry about what this code does. It is the formatting that counts.

```javascript
  let hourStart = hourParser("07:00");
  let hourEnd = hourParser("21:00");
  const yScale = scaleTime([hourStart, hourEnd], [vpad + h, vpad]);
  yScale.clamp(true);
  let dayWidth = (xScale(dateEnd) - xScale(dateStart)) / (endInd - startInd);
  // Draw tide block rectangles for the days
  for (let i = startInd; i < endInd; i++) {
    let currentBlocks = currentDays[i];
    for (let block of currentBlocks.blocks) {
      svg.append("rect")
        .attr("width", dayWidth);
	}
  }
```

### (b) CSS Example

Here is some CSS highlighted:

```css
h1, h2, h3 {
	font-family: Arial, sans-serif;
	
}

body {
	padding-left: 1em;
	padding-right: 1em;
}

details {
	max-width: 40em;
	border: solid black;
	padding: 0.5em;

}
```

### (c) HTML Example

Some HTML nicely highlighted:

```html
<body>
	<p>Starting date: <input type="date" id="DatePicker" min="2019-01-01", max="2019-12-17" ></p>
	<section>
		<div id="CurrentViz1"></div>
		<div id="CurrentViz2"></div>
		<script src="./currentViz.js"></script>
	</section>
</body>
```

## Question 3 (Links)

Other questions may ask you to provide a link. Typically to one of your deployed websites on the CS server computer. Markdown makes providing link easy, but you **must** ***check*** your links. Broken links will **not** receive any credit for that portion of the assignment!

Here are some example links:

1. A React application I wrote used in teaching advanced networking classes: [ComNetViz](https://www.grotto-networking.com/ComNetViz/ComNetViz.html).

2. A React application used to show sailing logs and GPS tracks: [Windsurfing Grotto](https://windsurf.grotto-networking.com/#/about).

3. A ficticious club website from a previous semester with useful tide information for foiling: [Bay Area Windsurf Foiling Club](https://bawfc.grotto-networking.com).

