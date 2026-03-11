# Datepicker Page Exploration Report

**URL:** https://www.globalsqa.com/demo-site/datepicker/  
**Date:** 2026-03-02T12:36:05.732Z

---

## 1. Full Page Screenshot
`Screenshot saved: 01-full-page.png`

---

## 2. Iframe Selector & Attributes

| Property | Value |
|----------|-------|
| **CSS Selector** | `iframe.demo-frame` |
| **XPath** | `(//iframe[@class='demo-frame'])[1]` |
| **Count on page** | 3 |
| **Class** | demo-frame |
| **ID** | none |
| **Src** | ../../demoSite/practice/datepicker/default.html |

**Frame Locator (Playwright):** `page.frameLocator('iframe.demo-frame').first()`

---

## 3. Datepicker Input Field Selector

| Property | Value |
|----------|-------|
| **CSS Selector** | `#datepicker` |
| **ID** | datepicker |
| **Type** | text |
| **Placeholder** | none |

**Note:** When interacting with the datepicker inside the iframe, use the frame locator:
`frame.locator('#datepicker')`

---

## 4. Calendar Popup Structure (jQuery UI Datepicker)

### Container
- **Main container:** `.ui-datepicker`
- **Header:** `.ui-datepicker-header`
- **Title (month/year):** `.ui-datepicker-title`
- **Month span:** `.ui-datepicker-month`
- **Year span:** `.ui-datepicker-year`

### Navigation Buttons
- **Previous month:** `.ui-datepicker-prev` (anchor tag)
- **Next month:** `.ui-datepicker-next` (anchor tag)
- Hover states: `.ui-datepicker-prev-hover`, `.ui-datepicker-next-hover`

### Calendar Grid
- **Calendar table:** `.ui-datepicker-calendar`
- **Day headers (Su, Mo, Tu...):** `th` elements within calendar
- **Day cells:** `a.ui-state-default` (anchor tags with date numbers)

### Documented Structure (from page)
```json
{
  "container": {
    "class": "ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
  },
  "header": {
    "class": "ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"
  },
  "prevButton": {
    "class": "ui-datepicker-prev ui-corner-all",
    "tag": "A"
  },
  "nextButton": {
    "class": "ui-datepicker-next ui-corner-all",
    "tag": "A"
  },
  "title": {
    "class": "ui-datepicker-title"
  },
  "monthSpan": {
    "class": "ui-datepicker-month",
    "text": "March"
  },
  "yearSpan": {
    "class": "ui-datepicker-year",
    "text": "2026"
  },
  "calendarTable": {
    "class": "ui-datepicker-calendar"
  },
  "dayCellSample": {
    "class": "ui-state-default",
    "tag": "A"
  },
  "dayCellCount": 31,
  "dayHeaderCount": 7,
  "dayHeaderSample": "ui-datepicker-week-end"
}
```

---

## 5. Month Navigation

| Action | Selector | Behavior |
|--------|----------|----------|
| Next month | `.ui-datepicker-next` | Click to advance one month |
| Previous month | `.ui-datepicker-prev` | Click to go back one month |

**Mechanism:** Simple click on the navigation anchor. The calendar re-renders with the new month.  
**After next click:** April 2026

---

## 6. Date Selection

| Property | Value |
|----------|-------|
| **Day cell selector** | `a.ui-state-default` |
| **To select specific day** | `a.ui-state-default:has-text("15")` (for 15th) |
| **Selected value in input** | 04/15/2026 |

---

## 7. Date Format in Input Field

**Format:** `mm/dd/yyyy`  
**Example:** 04/15/2026

---

## Screenshots Captured

1. `01-full-page.png` - Full page on load
2. `02-calendar-opened.png` - Calendar opened after clicking input
3. `03-next-month.png` - After clicking next month
4. `04-date-selected.png` - After selecting a date (value in input)

All screenshots saved to: `C:\Users\kunal1\Desktop\PlayWright\PlayWright_Practice1\datepicker-exploration-screenshots`
