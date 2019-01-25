function(pricesNASDAQ, printRecord, stopButton) {
    var stopButtonClicks = Observable.fromEvent(stopButton, "click")
    microsoftPrices = pricesNASDAQ
        .filter(function(priceRecord) {
            return priceRecord.name === "MSFT";
        })
        .takeUntil(stopButtonClicks)

    microsoftPrices.forEach(function(priceRecord) {
        printRecord(priceRecord);
    });
}
