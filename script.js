var mePkgType = "";
var meBusAddOns = 0;
var meRentAddOns = 0;
var partPkgType = "";
var partBusAddOns = 0;
var partRentAddOns = 0;

$(document).ready(function () {
  fillPkgGrid();
  fillAddOnGrid();
  fillSummaryPrice();

  // Handle "For Me" button clicks
  $(".pkg-me-but").click(function () {
    const buttonId = $(this).attr("id");
    console.log("buttonId=", buttonId);
    const pkgType = buttonId.substring(11, 30);
    console.log("pkgType=", pkgType);

    mePkgType = pkgType;
    $(".pkg-me-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");
    $(this).removeClass("btn-style-primary").addClass("btn-style-success");
  });

  // Handle "Partner" button clicks
  $(".pkg-part-but").click(function () {
    const buttonId = $(this).attr("id");
    console.log("buttonId=", buttonId);
    const pkgType = buttonId.substring(11, 30);
    console.log("pkgType=", pkgType);

    partPkgType = pkgType;
    $(".pkg-part-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");
    $(this).removeClass("btn-style-primary").addClass("btn-style-success");
  });
});

const fillPkgGrid = function () {
  var html = "";
  const rowCount = 3;
  const colCount = 3;
  var row = 1;
  var col = 1;

  var pkgs = [
    {
      name: "STANDARD",
      desc: "<p><b><i>Core Tax Service</i></b> for most individuals</p>",
      price: "$150",
    },
    {
      name: "EMPLOYEE ONLY",
      desc: "<p><b><i>Core Tax Service</i></b> for workers with only employment income</p>",
      price: "$115",
    },
    {
      name: "DISABILITY",
      desc: "<p><b><i>Core Tax Service</i></b> for those with disability benefits</p>",
      price: "$120",
    },
    {
      name: "SENIORS",
      desc: "<p><b><i>Core Tax Service</i></b> for those 65 or over</p>",
      price: "$135",
    },
    {
      name: "GIG ECONOMY",
      desc: "<p><b><i>Core Tax Service</i></b> for gig workers. Also includes <b><i>2 Business</i></b> Add-Ons</p>",
      price: "$175",
    },
    {
      name: "HOME DAY CARE",
      desc: "<p><b><i>Core Tax Service</i></b> for day care providers. Also includes <b><i>1 Business</i></b> Add-On</p>",
      price: "$185",
    },
    {
      name: "FULL-TIME STUDENTS",
      desc: "<p><b><i>Core Tax Service</i></b> for students</p>",
      price: "$85",
    },
  ];
  var currPkgNumb = 1;

  for (var row = 1; row <= rowCount; row++) {
    if (currPkgNumb > pkgs.length) break;

    html += "<div class='row gx-5'>";

    for (var col = 1; col <= colCount; col++) {
      if (currPkgNumb > pkgs.length) break;
      const currPkg = pkgs[currPkgNumb - 1];

      html += "<div class='custom-card col-md-4 p-3'>";
      html += "<div class='custom-card-top-wrap'>";
      html += "<h3>" + currPkg["name"] + "</h3>";
      html += currPkg["desc"];
      html += "<h6 class='price'>" + currPkg["price"] + "</h6>";
      html += "</div>";
      html += "<div class='custom-card-bot-wrap'>";
      html += "<div class='row g-2'>";
      html += "<div class='col-6'>";
      html +=
        "<button id='pkg-me-but-" +
        currPkg["name"] +
        "' class='pkg-me-but btn btn-style-primary w-100'>For Me</button>";
      html += "</div>";
      html += "<div class='col-6'>";
      html +=
        "<button id='pkg-part-but-" +
        currPkg["name"] +
        "' class='pkg-part-but btn btn-style-primary w-100'>Partner</button>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
      currPkgNumb += 1;
    }

    html += "</div>";
  }

  html += "</div>";
  $("#pkg-container").html(html);
};

const fillAddOnGrid = function () {
  var html = "";
  html += "<div class='add-on'>";
  html += "<div class='add-on-left-wrap'>";
  html += "<div>Business Add-On</div>";
  html += "</div>";
  html += "<div class='add-on-right-wrap'>";
  html += "<div>For Me: 0</div>";
  html +=
    "<button id='add-on-me-bus-increm-but' class='add-on-me-but btn btn-style-plus-minus rounded-circle'>-</button>";
  html +=
    "<button id='add-on-me-bus-decrem-but' class='add-on-me-but btn btn-style-plus-minus rounded-circle'>+</button>";
  html += "<div>Partner: 0</div>";
  html +=
    "<button id='add-on-part-bus-increm-but' class='add-on-part-but btn btn-style-plus-minus rounded-circle'>-</button>";
  html +=
    "<button id='add-on-part-bus-decrem-but' class='add-on-part-but btn btn-style-plus-minus rounded-circle'>+</button>";
  html += "</div>";
  html += "</div>";
  html += "<div class='add-on'>";
  html += "<div class='add-on-left-wrap'>";
  html += "<div>Rental Property Add-On</div>";
  html += "</div>";
  html += "<div class='add-on-right-wrap'>";
  html += "<div>For Me: 0</div>";
  html +=
    "<button id='add-on-me-rent-increm-but' class='add-on-me-but btn btn-style-plus-minus rounded-circle'>-</button>";
  html +=
    "<button id='add-on-me-rent-decrem-but' class='add-on-me-but btn btn-style-plus-minus rounded-circle'>+</button>";
  html += "<div>Partner: 0</div>";
  html +=
    "<button id='add-on-part-rent-increm-but' class='add-on-part-but btn btn-style-plus-minus rounded-circle'>-</button>";
  html +=
    "<button id='add-on-part-rent-decrem-but' class='add-on-part-but btn btn-style-plus-minus rounded-circle'>+</button>";
  html += "</div>";
  html += "</div>";

  $("#add-on-container").html(html);
};

const fillSummaryPrice = function () {
  var html = "";

  html += "<div id='summary-wrap'>";
  // title column
  html += "<div class='summary-column col-md-3>";
  html += "<div>Service</div>";
  html += "<div>Core</div>";
  html += "<div>Businesses</div>";
  html += "<div>Rentals</div>";
  html += "</div>";

  // me column
  html += "<div class='summary-column col-md-3>";
  html += "<div>For Me</div>";
  html += "<div>X</div>";
  html += "<div>0</div>";
  html += "<div>0</div>";
  html += "</div>";

  // partner column
  html += "<div class='summary-column col-md-3>";
  html += "<div>Partner</div>";
  html += "<div>X</div>";
  html += "<div>0</div>";
  html += "<div>0</div>";
  html += "<div>Subtotal</div>";
  html += "<div>HST</div>";
  html += "<div>Total</div>";
  html += "</div>";

  // price column
  html += "<div class='summary-column col-md-3>";
  html += "<div>Price</div>";
  html += "<div>100</div>";
  html += "<div>200</div>";
  html += "<div>300</div>";
  html += "<div>600</div>";
  html += "<div>85</div>";
  html += "<div>685</div>";
  html += "</div>";
  html += "</div>";

  $("#summary-container").html(html);
};
