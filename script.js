const pricePkgSTANDARD = 150;
const pricePkgEMPLOYEE_ONLY = 115;
const pricePkgDISABLED = 120;
const pricePkgSENIORS = 130;
const pricePkgGIG_ECONOMY = 175;
const pricePkgHOME_DAY_CARE = 185;
const pricePkgFULL_TIME_STUDENTS = 85;
const priceAddOnBUSINESS = 50;
const priceAddOnRENT = 50;

var mePkgType = "";
var partPkgType = "";

var meBusAddOns = 0;
var meBusAddOnsDiscount = 0;
var partBusAddOns = 0;
var partBusAddOnsDiscount = 0;

var meRentAddOns = 0;
var meRentAddOnsDiscount = 0;
var partRentAddOns = 0;
var partRentAddOnsDiscount = 0;

$(document).ready(function () {
  fillPkgGrid();

  // Handle "For Me" button clicks
  $(".pkg-me-but").click(function () {
    const buttonId = $(this).attr("id");
    console.log("buttonId=", buttonId);
    mePkgType = buttonId
      .substring(11, 30)
      .replaceAll(" ", "_")
      .replaceAll("-", "_");
    console.log("mePkgType=", mePkgType);

    meBusAddOnsDiscount = 0;
    meRentAddOnsDiscount = 0;
    switch (mePkgType) {
      case "GIG_ECONOMY":
        meBusAddOnsDiscount = 2;
        break;
      case "HOME_DAY_CARE":
        meBusAddOnsDiscount = 1;
        break;
    }

    $(".pkg-me-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");
    $(this).removeClass("btn-style-primary").addClass("btn-style-success");

    updatePrices();
  });

  // Handle "Partner" button clicks
  $(".pkg-part-but").click(function () {
    const buttonId = $(this).attr("id");
    console.log("buttonId=", buttonId);
    console.log("13=", buttonId.substring(13, 30));
    partPkgType = buttonId
      .substring(13, 30)
      .replaceAll(" ", "_")
      .replaceAll("-", "_");
    console.log("partPkgType=", partPkgType);

    partBusAddOnsDiscount = 0;
    partRentAddOnsDiscount = 0;
    switch (partPkgType) {
      case "GIG_ECONOMY":
        partBusAddOnsDiscount = 2;
        break;
      case "HOME_DAY_CARE":
        partBusAddOnsDiscount = 1;
        break;
    }

    $(".pkg-part-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");
    $(this).removeClass("btn-style-primary").addClass("btn-style-success");

    updatePrices();
  });

  $(".add-on-but").click(function () {
    const cls = $(this).attr("class");
    if (cls.includes("part")) {
      if (cls.includes("rent")) {
        if (cls.includes("increm")) {
          partRentAddOns += 1;
        } else {
          partRentAddOns -= 1;
        }
      } else {
        if (cls.includes("increm")) {
          partBusAddOns += 1;
        } else {
          partBusAddOns -= 1;
        }
      }
    } else {
      if (cls.includes("rent")) {
        if (cls.includes("increm")) {
          meRentAddOns += 1;
        } else {
          meRentAddOns -= 1;
        }
      } else {
        if (cls.includes("increm")) {
          meBusAddOns += 1;
        } else {
          meBusAddOns -= 1;
        }
      }
    }

    updatePrices();
  });

  updatePrices();
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
      price: "$" + pricePkgSTANDARD,
    },
    {
      name: "EMPLOYEE ONLY",
      desc: "<p><b><i>Core Tax Service</i></b> for workers with only employment income</p>",
      price: "$" + pricePkgEMPLOYEE_ONLY,
    },
    {
      name: "DISABLED",
      desc: "<p><b><i>Core Tax Service</i></b> for those with disability benefits</p>",
      price: "$" + pricePkgDISABLED,
    },
    {
      name: "SENIORS",
      desc: "<p><b><i>Core Tax Service</i></b> for those 65 or over</p>",
      price: "$" + pricePkgSENIORS,
    },
    {
      name: "GIG ECONOMY",
      desc: "<p><b><i>Core Tax Service</i></b> for gig workers. Also includes <b><i>2 Business</i></b> Add-Ons</p>",
      price: "$" + pricePkgGIG_ECONOMY,
    },
    {
      name: "HOME DAY CARE",
      desc: "<p><b><i>Core Tax Service</i></b> for day care providers. Also includes <b><i>1 Business</i></b> Add-On</p>",
      price: "$" + pricePkgHOME_DAY_CARE,
    },
    {
      name: "FULL-TIME STUDENTS",
      desc: "<p><b><i>Core Tax Service</i></b> for students</p>",
      price: "$" + pricePkgFULL_TIME_STUDENTS,
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

const updatePrices = function () {
  var priceMeCore = 0;
  switch (mePkgType) {
    case "STANDARD":
      priceMeCore = pricePkgSTANDARD;
      break;
    case "EMPLOYEE_ONLY":
      priceMeCore = pricePkgEMPLOYEE_ONLY;
      break;
    case "DISABLED":
      priceMeCore = pricePkgDISABLED;
      break;
    case "SENIORS":
      priceMeCore = pricePkgSENIORS;
      break;
    case "GIG_ECONOMY":
      priceMeCore = pricePkgGIG_ECONOMY;
      break;
    case "HOME_DAY_CARE":
      priceMeCore = pricePkgHOME_DAY_CARE;
      break;
    case "FULL_TIME_STUDENTS":
      priceMeCore = pricePkgFULL_TIME_STUDENTS;
      break;
  }

  var pricePartCore = 0;
  switch (partPkgType) {
    case "STANDARD":
      pricePartCore = pricePkgSTANDARD;
      break;
    case "EMPLOYEE_ONLY":
      pricePartCore = pricePkgEMPLOYEE_ONLY;
      break;
    case "DISABLED":
      pricePartCore = pricePkgDISABLED;
      break;
    case "SENIORS":
      pricePartCore = pricePkgSENIORS;
      break;
    case "GIG_ECONOMY":
      pricePartCore = pricePkgGIG_ECONOMY;
      break;
    case "HOME_DAY_CARE":
      pricePartCore = pricePkgHOME_DAY_CARE;
      break;
    case "FULL_TIME_STUDENTS":
      pricePartCore = pricePkgFULL_TIME_STUDENTS;
      break;
  }

  const priceTotalCore = priceMeCore + pricePartCore;

  $("#price-me-core").html("$" + priceMeCore);
  $("#price-part-core").html("$" + pricePartCore);
  $("#price-total-core").html("$" + priceTotalCore);

  const totalMeBusAddOns = meBusAddOns + meBusAddOnsDiscount;
  const priceMeBusAddOns = meBusAddOns * priceAddOnBUSINESS;
  const totalPartBusAddOns = partBusAddOns + partBusAddOnsDiscount;
  const pricePartBusAddOns = partBusAddOns * priceAddOnBUSINESS;
  const priceTotalBusAddOns = priceMeBusAddOns + pricePartBusAddOns;

  $("#price-me-bus").html("(" + totalMeBusAddOns + ") $" + priceMeBusAddOns);
  $("#price-part-bus").html(
    "(" + totalPartBusAddOns + ") $" + pricePartBusAddOns
  );
  $("#price-total-bus").html("$" + priceTotalBusAddOns);

  const priceMeRentAddOns = meRentAddOns * priceAddOnRENT;
  const pricePartRentAddOns = partRentAddOns * priceAddOnRENT;
  const priceTotalRentAddOns = priceMeRentAddOns + pricePartRentAddOns;

  $("#price-me-rent").html("(" + meRentAddOns + ") $" + priceMeRentAddOns);
  $("#price-part-rent").html(
    "(" + partRentAddOns + ") $" + pricePartRentAddOns
  );
  $("#price-total-rent").html("$" + priceTotalRentAddOns);
};
