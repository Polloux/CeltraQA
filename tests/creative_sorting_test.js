Feature('Creative Sorting');

Scenario('Confirm default and size descending sorting', async ({I}) => {
    // 1. VISIT PAGE
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    // 2. SEE DEFAULT SORT
    I.waitForElement(locate('.selectbox__current-item p').withAttr({ 'data-testilda-id': 'defaultListItem' }), 5);
    I.see('Last modified creative', locate('.selectbox__current-item p').withAttr({ 'data-testilda-id': 'defaultListItem' }));

    // 3. VERIFYING 3 CREATIVES
    I.waitForElement('[data-testilda-id="creative-variant-unit"]', 5);
    I.seeNumberOfElements('[data-testilda-id="creative-variant-unit"]', 3);

    // 3. GRAB ORDER
    let initialSizes = await I.grabTextFromAll('.creative-variant-metadata__properties__info__size-label');
    //console.log('Initial order:', initialSizes);

    // 4. CLICK SORT DROPDOWN
    I.click('.creative-variants-list--header__sort [data-testilda-id="defaultListItem"]');

    // 4. SORT BY SIZE
    I.click(locate('[data-testilda-id="defaultListItem"]').withText('Larger to smaller'));

    // 5. WAIT FOR DOM ELEMENT TO CHANGE TEXT to confirm that we have successfully sorted larger to smaller
    I.waitForFunction(() => {
        const el = document.querySelector('[data-testilda-id="defaultListItem"]');
        return el && el.innerText.includes('Larger to smaller');
    }, 5);

    // 5. I SEE CREATIVES LARGEST TO SMALLEST

    // Simple solution
    // I.see('320×460', locate('.creative-variant').at(1));
    // I.see('300×250', locate('.creative-variant').at(2));
    // I.see('320×50', locate('.creative-variant').at(3));

    // We could also use the initialSizes that we set before

    // GRABBING, MAPPING AND CALCULATING AREAS
    let sizes = await I.grabTextFromAll('[data-testilda-id="creative-variant-metadata"] .creative-variant-metadata__properties__info__size-label');
    let areas = sizes.map(label => {
        const [w, h] = label.split('×').map(n => parseInt(n));
        return w * h;
    });
    for (let i = 0; i < areas.length - 1; i++) {
        if (areas[i] < areas[i + 1]) {
            throw new Error(`Not correctly sorted: ${areas.join(', ')}`);
        }
    }
});
