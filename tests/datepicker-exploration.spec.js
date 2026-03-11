/**
 * Datepicker Page Exploration Script
 * Explores https://www.globalsqa.com/demo-site/datepicker/
 * Captures screenshots and documents structure for reporting
 */
import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'datepicker-exploration-screenshots');
const REPORT_FILE = path.join(process.cwd(), 'datepicker-exploration-report.md');

test.describe('Datepicker Page Exploration', () => {
  test('Full exploration and documentation', async ({ page }) => {
    // Create screenshot directory
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    const report = {
      iframe: {},
      datepickerInput: {},
      calendar: {},
      monthNavigation: {},
      dateSelection: {},
      dateFormat: ''
    };

    // 1. Navigate to page
    await page.goto('https://www.globalsqa.com/demo-site/datepicker/', { waitUntil: 'networkidle' });

    // 2. Take full page screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-full-page.png'), fullPage: true });
    report.fullPage = 'Screenshot saved: 01-full-page.png';

    // 3. Find iframe - document its attributes
    const iframe = page.locator('iframe.demo-frame').first();
    await iframe.waitFor({ state: 'visible', timeout: 10000 });

    const iframeCount = await page.locator('iframe.demo-frame').count();
    const iframeSrc = await iframe.getAttribute('src');
    const iframeClass = await iframe.getAttribute('class');
    const iframeId = await iframe.getAttribute('id');

    report.iframe = {
      selector: "iframe.demo-frame",
      xpath: "(//iframe[@class='demo-frame'])[1]",
      count: iframeCount,
      attributes: { src: iframeSrc, class: iframeClass, id: iframeId }
    };

    // 4. Switch to frame context and interact with datepicker
    const frame = page.frameLocator('iframe.demo-frame').first();

    // Document datepicker input
    const datepickerInput = frame.locator('#datepicker');
    await datepickerInput.waitFor({ state: 'visible' });

    const inputId = await datepickerInput.getAttribute('id');
    const inputType = await datepickerInput.getAttribute('type');
    const inputPlaceholder = await datepickerInput.getAttribute('placeholder');

    report.datepickerInput = {
      selector: '#datepicker',
      attributes: { id: inputId, type: inputType, placeholder: inputPlaceholder }
    };

    // 5. Click on input to open calendar
    await datepickerInput.click();
    await page.waitForTimeout(500);

    // 6. Take screenshot of opened calendar
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-calendar-opened.png'), fullPage: true });

    // 7. Document calendar structure - evaluate in frame context
    const calendarInfo = await frame.locator('.ui-datepicker').evaluate((el) => {
      if (!el) return null;
      const getClasses = (e) => e ? e.className : '';
      const header = el.querySelector('.ui-datepicker-header');
      const prevBtn = el.querySelector('.ui-datepicker-prev');
      const nextBtn = el.querySelector('.ui-datepicker-next');
      const title = el.querySelector('.ui-datepicker-title');
      const monthSpan = el.querySelector('.ui-datepicker-month');
      const yearSpan = el.querySelector('.ui-datepicker-year');
      const calendar = el.querySelector('.ui-datepicker-calendar');
      const dayCells = el.querySelectorAll('a.ui-state-default');
      const dayHeaders = el.querySelectorAll('.ui-datepicker-calendar th');

      return {
        container: { class: getClasses(el) },
        header: { class: header ? getClasses(header) : null },
        prevButton: { class: prevBtn ? getClasses(prevBtn) : null, tag: prevBtn ? prevBtn.tagName : null },
        nextButton: { class: nextBtn ? getClasses(nextBtn) : null, tag: nextBtn ? nextBtn.tagName : null },
        title: { class: title ? getClasses(title) : null },
        monthSpan: { class: monthSpan ? getClasses(monthSpan) : null, text: monthSpan ? monthSpan.textContent : null },
        yearSpan: { class: yearSpan ? getClasses(yearSpan) : null, text: yearSpan ? yearSpan.textContent : null },
        calendarTable: { class: calendar ? getClasses(calendar) : null },
        dayCellSample: dayCells.length > 0 ? { class: getClasses(dayCells[0]), tag: dayCells[0].tagName } : null,
        dayCellCount: dayCells.length,
        dayHeaderCount: dayHeaders.length,
        dayHeaderSample: dayHeaders.length > 0 ? getClasses(dayHeaders[0]) : null
      };
    });

    report.calendar = calendarInfo;

    // 8. Navigate to next month
    await frame.locator('.ui-datepicker-next').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-next-month.png'), fullPage: true });

    const nextMonthInfo = await frame.locator('.ui-datepicker-title').textContent();
    report.monthNavigation = {
      nextButtonSelector: '.ui-datepicker-next',
      prevButtonSelector: '.ui-datepicker-prev',
      afterNextClick: nextMonthInfo,
      mechanism: 'Click on .ui-datepicker-next to go forward, .ui-datepicker-prev to go back'
    };

    // 9. Select a specific date (e.g., 15th)
    await frame.locator('a.ui-state-default:has-text("15")').first().click();
    await page.waitForTimeout(300);

    const selectedValue = await datepickerInput.inputValue();
    report.dateFormat = selectedValue;
    report.dateSelection = {
      dayCellSelector: 'a.ui-state-default',
      example: 'a.ui-state-default:has-text("15")',
      selectedValue: selectedValue,
      format: 'mm/dd/yyyy'
    };

    // 10. Screenshot with selected value
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-date-selected.png'), fullPage: true });

    // Write report
    const reportContent = `# Datepicker Page Exploration Report

**URL:** https://www.globalsqa.com/demo-site/datepicker/  
**Date:** ${new Date().toISOString()}

---

## 1. Full Page Screenshot
\`${report.fullPage}\`

---

## 2. Iframe Selector & Attributes

| Property | Value |
|----------|-------|
| **CSS Selector** | \`iframe.demo-frame\` |
| **XPath** | \`(//iframe[@class='demo-frame'])[1]\` |
| **Count on page** | ${report.iframe.count} |
| **Class** | ${report.iframe.attributes.class} |
| **ID** | ${report.iframe.attributes.id || 'none'} |
| **Src** | ${report.iframe.attributes.src || 'inline'} |

**Frame Locator (Playwright):** \`page.frameLocator('iframe.demo-frame').first()\`

---

## 3. Datepicker Input Field Selector

| Property | Value |
|----------|-------|
| **CSS Selector** | \`#datepicker\` |
| **ID** | ${report.datepickerInput.attributes.id} |
| **Type** | ${report.datepickerInput.attributes.type} |
| **Placeholder** | ${report.datepickerInput.attributes.placeholder || 'none'} |

**Note:** When interacting with the datepicker inside the iframe, use the frame locator:
\`frame.locator('#datepicker')\`

---

## 4. Calendar Popup Structure (jQuery UI Datepicker)

### Container
- **Main container:** \`.ui-datepicker\`
- **Header:** \`.ui-datepicker-header\`
- **Title (month/year):** \`.ui-datepicker-title\`
- **Month span:** \`.ui-datepicker-month\`
- **Year span:** \`.ui-datepicker-year\`

### Navigation Buttons
- **Previous month:** \`.ui-datepicker-prev\` (anchor tag)
- **Next month:** \`.ui-datepicker-next\` (anchor tag)
- Hover states: \`.ui-datepicker-prev-hover\`, \`.ui-datepicker-next-hover\`

### Calendar Grid
- **Calendar table:** \`.ui-datepicker-calendar\`
- **Day headers (Su, Mo, Tu...):** \`th\` elements within calendar
- **Day cells:** \`a.ui-state-default\` (anchor tags with date numbers)

### Documented Structure (from page)
\`\`\`json
${JSON.stringify(report.calendar, null, 2)}
\`\`\`

---

## 5. Month Navigation

| Action | Selector | Behavior |
|--------|----------|----------|
| Next month | \`.ui-datepicker-next\` | Click to advance one month |
| Previous month | \`.ui-datepicker-prev\` | Click to go back one month |

**Mechanism:** Simple click on the navigation anchor. The calendar re-renders with the new month.  
**After next click:** ${report.monthNavigation.afterNextClick}

---

## 6. Date Selection

| Property | Value |
|----------|-------|
| **Day cell selector** | \`a.ui-state-default\` |
| **To select specific day** | \`a.ui-state-default:has-text("15")\` (for 15th) |
| **Selected value in input** | ${report.dateSelection.selectedValue} |

---

## 7. Date Format in Input Field

**Format:** \`mm/dd/yyyy\`  
**Example:** ${report.dateFormat}

---

## Screenshots Captured

1. \`01-full-page.png\` - Full page on load
2. \`02-calendar-opened.png\` - Calendar opened after clicking input
3. \`03-next-month.png\` - After clicking next month
4. \`04-date-selected.png\` - After selecting a date (value in input)

All screenshots saved to: \`${SCREENSHOT_DIR}\`
`;

    fs.writeFileSync(REPORT_FILE, reportContent, 'utf8');
    console.log('\n=== REPORT WRITTEN TO:', REPORT_FILE, '===\n');
  });
});
