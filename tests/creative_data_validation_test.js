Feature('Creative Data Validation');

Scenario('Check that Banner is displayed correctly', async ({ I }) => {
    // 1. VISIT PAGE
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    // 2. WAIT FOR ELEMENTS
    I.waitForElement('[data-testilda-id="creative-variant-metadata"]', 5);
    I.seeNumberOfElements('[data-testilda-id="creative-variant-unit"]', 3);

    // 2. FIND "300×250 – Universal Banner" ELEMENT
    const bannerBlock = locate('[data-testilda-id="creative-variant-metadata"]').withText('300×250 – Universal Banner');

    // 2. BANNER TEXT IS CONTAINED WITHIN THE BANNER
    I.waitForElement('[data-testilda-id="creative-variant-placement"] iframe[src*="creativeId=810f934b"]', 5);
    I.seeAttributesOnElements('[data-testilda-id="creative-variant-placement"] iframe[src*="creativeId=810f934b"]', { width: "300", height: "250" });

    // In case the element is not an iFrame
    // const isCentered = await I.executeScript(() => {
    //     const el = document.querySelector('[data-testilda-id="creative-variant-metadata"]:nth-of-type(3) .middle-ellipsis__text');
    //     const parent = el?.parentElement;
    //
    //     if (!el || !parent) return false;
    //     // Not necessary here since in this case it will always show but
    //     // more tests is always better than fewer tests
    //
    //     const elRectangle = el.getBoundingClientRect();
    //     const parentRectangle = parent.getBoundingClientRect();
    //
    //     const elCenterX = (elRectangle.left + elRectangle.right) / 2;
    //     const parentCenterX = (parentRectangle.left + parentRectangle.right) / 2;
    //
    //     // If we want to allow a few pixels of error margin
    //     //return Math.abs(elCenterX - parentCenterX) < 5;
    //     // If we want it to be pixel perfect
    //     return Math.abs(elCenterX - parentCenterX) === 0;
    // });
    // if (!isCentered) {
    //     throw new Error('Banner text is not centered.');
    // }

    // This version checks CSS, again only if the element is inside DOM, which it isn't now
    // const styles = await I.executeScript(() => {
    //     const el = document.querySelector('.middle-ellipsis__text');
    //     return window.getComputedStyle(el).textAlign;
    // });
    // if (styles !== 'center') {
    //     throw new Error(`Text is not centered. Found: ${styles}`);
    // }

    // This version would be if it wasn't cross origin
    // I.executeScript(() => {
    //     const iframe = document.querySelector('iframe[src*="creativeId=810f934b"]');
    //     const doc = iframe.contentDocument || iframe.contentWindow.document;
    //     const banner = doc.querySelector('.middle-ellipsis__text') || doc.querySelector('p'); // Or other selector didn't get into this example too much as it won't work either way
    //     const parent = banner.parentElement;
    //
    //     const bannerRect = banner.getBoundingClientRect();
    //     const parentRect = parent.getBoundingClientRect();
    //
    //     const isCentered = Math.abs((parentRect.width - bannerRect.width) / 2 - (bannerRect.left - parentRect.left)) < 5;
    //     return isCentered;
    // });

    const isCentered = await I.executeScript(() => {
        const iframe = document.querySelector('iframe[src*="creativeId=810f934b"]');
        const parent = iframe?.parentElement;
        if (!iframe || !parent) return false;
        const iframeRect = iframe.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const iframeCenter = (iframeRect.left + iframeRect.right) / 2;
        const parentCenter = (parentRect.left + parentRect.right) / 2;
        return Math.abs(iframeCenter - parentCenter) < 5;
    });
    if (!isCentered) {
        throw new Error("Iframe is not horizontally centered.");
    }

    I.saveElementScreenshot('[data-testilda-id="creative-variant-unit"]', 'banner.png');
    //I.seeVisualDiff('banner.png', {tolerance: 2}); I had no time to implement the resemble helper, but I would
    // compare it visually like this.
});
