Feature('Creative Filtering');

Scenario('Filter by Format and Size, then clear filters', async ({I}) => {
    // 1. VISIT PAGE
    I.amOnPage('https://martin-kregar.celtra.com/explorer/1df8d540');

    // 2. VERIFYING 3 CREATIVES
    I.waitForElement('[data-testilda-id="creative-variant-unit"]', 5);
    I.seeNumberOfElements('[data-testilda-id="creative-variant-unit"]', 3);
    // We could also check text Creative variants, but that is more flaky

    // 3. CLICK ADD
    I.click('[data-testilda-id="add-filter-button"]');

    // 3. WAITING FOR DROPDOWN
    I.waitForElement('.filter-new__options', 5);

    // 3. CLICK FORMAT
    // I could add a checker if it's disabled (if filter for format was already set) but in this case we do not need it.
    I.click(locate('li.filter-new__options--action').withDescendant(locate('span').withText('Format')));
    // For improvements we would need a data class here as well

    // 3. CLICK UNIVERSAL BANNER
    I.click('[data-id="universal-banner"]');
    // Above is the default, use below version if checkbox is flaky
    // I.waitForElement(locate('.checkbox__label-text').withDescendant(locate('div').withText('Universal Banner')), 5);
    // I.click(locate('.checkbox__label-text').withDescendant(locate('div').withText('Universal Banner')));

    // 3. CLICK APPLY
    I.waitForElement('[data-testilda-id="dialog-button"]', 5); // Parent wrapper
    I.click('[data-testilda-id="dialog-button"]');

    // 4. SEE ONLY 1 ELEMENT
    I.waitForElement('.creative-variant', 3);
    I.seeNumberOfElements('.creative-variant', 1);

    // 5. CLICK ADD AGAIN
    I.click('[data-testilda-id="add-filter-button"]');
    I.waitForElement('.filter-new__options', 5);

    // 5. CLICK SIZE
    // I could add a checker if it's disabled (if filter for size was already set) but in this case we do not need it.
    I.click(locate('li.filter-new__options--action').withDescendant(locate('span').withText('Size')));
    // For improvements we would need a data class here as well

    // 5. CLICK 320X50
    I.click('[data-id="320x50"]');

    // 5. CLICK APPLY
    I.waitForElement('[data-testilda-id="dialog-button"]', 5); // Parent wrapper
    I.click('[data-testilda-id="dialog-button"]');

    // 6. WAIT FOR FILTER RESET BUTTON TO SHOW. This shows that no elements exist. Best to check for presence
    // of elements than absence, as it's flakier to define what "empty" means
    I.waitForElement('[data-testilda-id="filters-reset-button"]', 5);

    // 7. RESET FILTERS
    // We could also go checking how many filters are set at the top and click them each separately on their 'x',
    // but in this scenario, this doesn't do much good
    I.click('[data-testilda-id="filters-reset-button"]');

    // 8. SEE 3 CREATIVE ELEMENTS
    I.waitForElement('.creative-variant', 5);
    I.seeNumberOfElements('.creative-variant', 3);
});
