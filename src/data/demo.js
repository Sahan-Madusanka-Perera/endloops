// Sample data for the vouching demo. Every supplier, invoice and amount here is
// invented for illustration and labelled "Sample data" on the page.

export const APPROVAL_LIMIT = 25000

export const entries = [
  { line: 1, supplier: 'Gulf Coast Facilities LLC', doc: 'INV-10432', date: '03 Oct', ledger: 18450, invoice: 18450 },
  { line: 2, supplier: 'Al Noor Cleaning Services', doc: 'INV-2291', date: '05 Oct', ledger: 6300, invoice: 6300 },
  {
    line: 3,
    supplier: 'Marina Lift Maintenance',
    doc: 'ML-0871',
    date: '07 Oct',
    ledger: 12600,
    invoice: 11360,
    flag: {
      kind: 'Total doesn’t agree',
      note: 'Ledger AED 12,600.00, invoice AED 11,360.00. Difference AED 1,240.00.',
    },
  },
  { line: 4, supplier: 'Desert Bloom Landscaping', doc: 'DB-554', date: '09 Oct', ledger: 4725, invoice: 4725 },
  { line: 5, supplier: 'Sahara Security Services', doc: 'SS-2207', date: '12 Oct', ledger: 9800, invoice: 9800 },
  {
    line: 6,
    supplier: 'Sahara Security Services',
    doc: 'SS-2207',
    date: '14 Oct',
    ledger: 9800,
    invoice: 9800,
    flag: {
      kind: 'Possible duplicate',
      note: 'Same supplier, invoice number and amount as line 5, posted two days later.',
    },
  },
  {
    line: 7,
    supplier: 'Creek Electrical Works',
    doc: null,
    date: '18 Oct',
    ledger: 3150,
    invoice: null,
    flag: { kind: 'No support found', note: 'No invoice or receipt in the batch matches this entry.' },
  },
  {
    line: 8,
    supplier: 'Bluewave Pools',
    doc: 'BW-1190',
    date: '21 Oct',
    ledger: 27300,
    invoice: 27300,
    flag: {
      kind: 'Above approval limit',
      note: 'AED 27,300.00 is above the AED 25,000.00 limit, and no approval is attached.',
    },
  },
]

export const rules = [
  { id: 'agree', label: 'Totals agree to invoice' },
  { id: 'dup', label: 'No duplicate postings' },
  { id: 'support', label: 'Support attached for every entry' },
  { id: 'limit', label: 'Within approval limit' },
]

export const aed = (n) =>
  n == null ? '—' : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const ledgerTotal = entries.reduce((sum, e) => sum + e.ledger, 0)
