/**
 * Summary (CRP demo — script 1):
 * - Does a bunch of math in a loop so the browser spends noticeable time running
 *   this file (for teaching / demos).
 * - When that is done, adds a short line of text under the page header (e.g.
 *   "Script 1 is ready: UI hydrated").
 * - If the page is not finished loading yet, waits until the HTML is ready before
 *   finding the header and adding that text; otherwise adds it right away.
 */
;(function () {
  // Keep some work so the script remains "heavy"
  const values = []
  for (let i = 0; i < 250_000; i += 1) {
    values.push((i * 17) % 1009)
  }

  let checksum = 0
  for (let i = 0; i < values.length; i += 1) {
    checksum = (checksum + values[i]) % 10_000_019
  }

  const render = () => {
    const header = document.querySelector('header')
    if (!header) return

    const existing = document.getElementById('crp-script-1-status')
    if (existing) {
      existing.textContent = 'Script 1 is ready: UI hydrated'
      return
    }

    const el = document.createElement('p')
    el.id = 'crp-script-1-status'
    el.className = 'subtitle'
    el.textContent = 'Script 1 is ready: UI hydrated'
    header.appendChild(el)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render, { once: true })
    return
  }

  render()
})()

