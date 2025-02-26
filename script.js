const pricePkgSTANDARD = 150;
const pricePkgEMPLOYEE_ONLY = 115;
const pricePkgDISABLED = 125;
const pricePkgSENIORS = 135;
const pricePkgGIG_ECONOMY = 175;
const pricePkgHOME_DAY_CARE = 185;
const pricePkgFULL_TIME_STUDENTS = 90;
const priceAddOnBUSINESS = 50;
const priceAddOnRENT = 50;
const priceAddOnHST = 50;

var mePkgType = "STANDARD";
var partPkgType = "";

var meBusAddOns = 0;
var meBusAddOnsDiscount = 0;
var partBusAddOns = 0;
var partBusAddOnsDiscount = 0;

var meRentAddOns = 0;
var partRentAddOns = 0;

var meHstAddOns = 0;
var partHstAddOns = 0;

$(document).ready(function () {
  fillPkgGrid();

  pkgChangeHandlers();
  addOnHandler();

  updateAddOnsCount();
  updatePrices();
});

const fillPkgGrid = function () {
  var html = "";
  const rowCount = 4;
  const colCount = 2;
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

    html += "<div class='row mt-0 mb-0 g-3'>";

    for (var col = 1; col <= colCount; col++) {
      if (currPkgNumb > pkgs.length) break;
      const currPkg = pkgs[currPkgNumb - 1];
      const currPkgId = currPkg["name"]
        .replaceAll(" ", "_")
        .replaceAll("-", "_");

      html += "<div class='col-12 col-md-6 mt-0'>";
      html += "<div class='custom-card p-3'>";
      html += "<div class='custom-card-top-wrap'>";
      html += "<h3>" + currPkg["name"] + "</h3>";
      html += currPkg["desc"];
      html += "<h6 class='price-tag'>" + currPkg["price"] + "</h6>";
      html += "</div>";
      html += "<div class='custom-card-bot-wrap'>";
      html += "<div class='row g-2'>";
      html += "<div class='col-6'>";
      var useMeStyle = "btn-style-primary";
      if (currPkg["name"] == mePkgType) {
        useMeStyle = "btn-style-success";
      }
      html +=
        "<button id='pkg-me-but-" +
        currPkgId +
        "' class='pkg-me-but btn " +
        useMeStyle +
        " w-100'>For Me</button>";
      html += "</div>";
      html += "<div class='col-6'>";
      var usePartStyle = "btn-style-primary";
      if (currPkgId == partPkgType) {
        usePartStyle = "btn-style-success";
      }
      html +=
        "<button id='pkg-part-but-" +
        currPkgId +
        "' class='pkg-part-but btn " +
        usePartStyle +
        " w-100'>Partner</button>";
      html += "</div>";
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

const pkgChangeHandlers = function () {
  $(".pkg-me-but").click(function () {
    const buttonId = $(this).attr("id");

    console.log("buttonId=", buttonId);

    const newPkgType = buttonId.substring(11, 50);

    // reset package, in case user just selected a package they already have,
    // which effectively disconnects it.
    meBusAddOnsDiscount = 0;

    console.log("newPkgType=", newPkgType);

    $(".pkg-me-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");

    if (newPkgType != mePkgType) {
      // changed the package type
      mePkgType = newPkgType;

      switch (mePkgType) {
        case "GIG_ECONOMY":
          meBusAddOnsDiscount = 2;
          break;
        case "HOME_DAY_CARE":
          meBusAddOnsDiscount = 1;
          break;
      }

      $(this).removeClass("btn-style-primary").addClass("btn-style-success");
    } else {
      // selected type already selected, deselect
      mePkgType = "";
    }

    updateAddOnsCount();
    updatePrices();
  });

  // Handle "Partner" button clicks
  $(".pkg-part-but").click(function () {
    const buttonId = $(this).attr("id");

    console.log("buttonId=", buttonId);

    const newPkgType = buttonId.substring(13, 50);

    console.log("newPkgType=", newPkgType);

    // reset package, in case user just selected a package they already have,
    // which effectively disconnects it.
    partBusAddOnsDiscount = 0;

    $(".pkg-part-but")
      .removeClass("btn-style-success")
      .addClass("btn-style-primary");

    if (newPkgType != partPkgType) {
      // changed the package type
      partPkgType = newPkgType;

      switch (partPkgType) {
        case "GIG_ECONOMY":
          partBusAddOnsDiscount = 2;
          break;
        case "HOME_DAY_CARE":
          partBusAddOnsDiscount = 1;
          break;
      }

      $(this).removeClass("btn-style-primary").addClass("btn-style-success");
    } else {
      // selected type already selected, deselect
      partPkgType = "";
    }

    updateAddOnsCount();
    updatePrices();
  });
};

const addOnHandler = function () {
  $(".add-on-but").click(function () {
    const cls = $(this).attr("class");
    console.log("cls=", cls);

    const addOnLimit = 5;

    if (cls.includes("part")) {
      if (cls.includes("rent")) {
        if (cls.includes("increm")) {
          if (partRentAddOns < addOnLimit) partRentAddOns += 1;
        } else {
          if (partRentAddOns > 0) partRentAddOns -= 1;
        }
      } else if (cls.includes("hst")) {
        if (cls.includes("increm")) {
          if (partHstAddOns < addOnLimit) partHstAddOns += 1;
        } else {
          if (partHstAddOns > 0) partHstAddOns -= 1;
        }
      } else {
        if (cls.includes("increm")) {
          if (partBusAddOns < addOnLimit) partBusAddOns += 1;
        } else {
          if (partBusAddOns > 0) partBusAddOns -= 1;
        }
      }
    } else {
      if (cls.includes("rent")) {
        if (cls.includes("increm")) {
          if (meRentAddOns < addOnLimit) meRentAddOns += 1;
        } else {
          if (meRentAddOns > 0) meRentAddOns -= 1;
        }
      } else if (cls.includes("hst")) {
        if (cls.includes("increm")) {
          if (meHstAddOns < addOnLimit) meHstAddOns += 1;
        } else {
          if (meHstAddOns > 0) meHstAddOns -= 1;
        }
      } else {
        if (cls.includes("increm")) {
          if (meBusAddOns < addOnLimit) meBusAddOns += 1;
        } else {
          if (meBusAddOns > 0) meBusAddOns -= 1;
        }
      }
    }

    updateAddOnsCount();
    updatePrices();
  });
};

const updateAddOnsCount = function () {
  const meBusCount = meBusAddOns + meBusAddOnsDiscount;
  const partBusCount = partBusAddOns + partBusAddOnsDiscount;
  const meRentCount = meRentAddOns;
  const partRentCount = partRentAddOns;
  const meHstCount = meHstAddOns;
  const partHstCount = partHstAddOns;

  $("#add-on-me-bus-count").html(
    "For Me:&nbsp;&nbsp;<b>" + meBusCount + "</b>"
  );
  if (meBusCount) {
    $("#add-on-me-bus-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-me-bus-count").removeClass("add-on-count-positive");
  }

  $("#add-on-part-bus-count").html(
    "Partner:&nbsp;&nbsp;<b>" + (partBusCount + "</b>")
  );
  if (partBusCount) {
    $("#add-on-part-bus-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-part-bus-count").removeClass("add-on-count-positive");
  }

  $("#add-on-me-rent-count").html(
    "For Me:&nbsp;&nbsp;<b>" + meRentCount + "</b>"
  );
  if (meRentCount) {
    $("#add-on-me-rent-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-me-rent-count").removeClass("add-on-count-positive");
  }

  $("#add-on-part-rent-count").html(
    "Partner:&nbsp;&nbsp;<b>" + partRentCount + "</b>"
  );
  if (partRentCount) {
    $("#add-on-part-rent-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-part-rent-count").removeClass("add-on-count-positive");
  }

  $("#add-on-me-hst-count").html(
    "For Me:&nbsp;&nbsp;<b>" + meHstCount + "</b>"
  );
  if (meHstCount) {
    $("#add-on-me-hst-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-me-hst-count").removeClass("add-on-count-positive");
  }

  $("#add-on-part-hst-count").html(
    "Partner:&nbsp;&nbsp;<b>" + partHstCount + "</b>"
  );
  if (partHstCount) {
    $("#add-on-part-hst-count").addClass("add-on-count-positive");
  } else {
    $("#add-on-part-hst-count").removeClass("add-on-count-positive");
  }
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

  console.log("priceMeCore=", priceMeCore);
  console.log("pricePartCore=", pricePartCore);
  console.log("priceTotalCore=", priceTotalCore);

  var coreCount = 1;
  if (pricePartCore != 0) coreCount += 1;

  $("#sum-core-tax-label").html(coreCount + "x  Core Tax Service");
  $("#sum-core-tax-amount").html("$" + priceTotalCore);

  console.log("meBusAddOns=", meBusAddOns);
  console.log("meBusAddOnsDiscount=", meBusAddOnsDiscount);
  const totalMeBusAddOns = meBusAddOns + meBusAddOnsDiscount;
  const priceMeBusAddOns = meBusAddOns * priceAddOnBUSINESS;
  const totalPartBusAddOns = partBusAddOns + partBusAddOnsDiscount;
  const pricePartBusAddOns = partBusAddOns * priceAddOnBUSINESS;

  const countTotalBusAddOns = totalMeBusAddOns + totalPartBusAddOns;
  const priceTotalBusAddOns = priceMeBusAddOns + pricePartBusAddOns;
  if (countTotalBusAddOns == 0) {
    $("#sum-bus-addon-row").addClass("hidden");
  } else {
    $("#sum-bus-addon-row").removeClass("hidden");
    $("#sum-bus-addon-label").html(countTotalBusAddOns + "x  Businesses");
    $("#sum-bus-addon-amount").html("$" + priceTotalBusAddOns);
  }

  const totalMeRentAddOns = meRentAddOns;
  const priceMeRentAddOns = meRentAddOns * priceAddOnRENT;
  const totalPartRentAddOns = partRentAddOns;
  const pricePartRentAddOns = partRentAddOns * priceAddOnRENT;

  const countTotalRentAddOns = totalMeRentAddOns + totalPartRentAddOns;
  const priceTotalRentAddOns = priceMeRentAddOns + pricePartRentAddOns;
  if (countTotalRentAddOns == 0) {
    $("#sum-rent-addon-row").addClass("hidden");
  } else {
    $("#sum-rent-addon-row").removeClass("hidden");
    $("#sum-rent-addon-label").html(
      countTotalRentAddOns + "x  Rental Properties"
    );
    $("#sum-rent-addon-amount").html("$" + priceTotalRentAddOns);
  }

  const totalMeHstAddOns = meHstAddOns;
  const priceMeHstAddOns = meHstAddOns * priceAddOnHST;
  const totalPartHstAddOns = partHstAddOns;
  const pricePartHstAddOns = partHstAddOns * priceAddOnHST;

  const countTotalHstAddOns = totalMeHstAddOns + totalPartHstAddOns;
  const priceTotalHstAddOns = priceMeHstAddOns + pricePartHstAddOns;
  if (countTotalHstAddOns == 0) {
    $("#sum-hst-addon-row").addClass("hidden");
  } else {
    $("#sum-hst-addon-row").removeClass("hidden");
    $("#sum-hst-addon-label").html(countTotalHstAddOns + "x  HST Filings");
    $("#sum-hst-addon-amount").html("$" + priceTotalHstAddOns);
  }

  const subtotal =
    priceTotalCore +
    priceTotalBusAddOns +
    priceTotalRentAddOns +
    priceTotalHstAddOns;
  const hst = subtotal * 0.13;
  const total = subtotal + hst;

  $("#sum-subtotal-amount").html("$" + subtotal.toFixed(2));
  $("#sum-hst-amount").html("$" + hst.toFixed(2));
  $("#sum-total-amount").html("$" + total.toFixed(2));
};
