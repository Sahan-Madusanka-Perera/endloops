// Product and capability content for the whole site.
// Descriptions are written from the brief; no product is labelled live or in
// development because the brief doesn't say which is which.

export const capabilities = [
  {
    id: 'read',
    mark: 'R',
    name: 'Read',
    line: 'Pulls figures and details out of invoices, purchase orders, contracts and statements.',
  },
  {
    id: 'match',
    mark: 'M',
    name: 'Match',
    line: 'Checks documents against the ledger, and quotes against each other.',
  },
  {
    id: 'check',
    mark: 'C',
    name: 'Check',
    line: 'Flags missing items, totals that don’t agree, duplicates and anything outside agreed limits.',
  },
  {
    id: 'draft',
    mark: 'D',
    name: 'Draft',
    line: 'Prepares schedules, working papers and reports, ready for review.',
  },
  {
    id: 'bulk',
    mark: 'B',
    name: 'Bulk',
    line: 'Works through hundreds of documents in one run.',
  },
]

export const solutions = [
  {
    slug: 'budget-review',
    ref: 'B1',
    name: 'Budget review',
    summary:
      'Tests a budget against prior-year actuals, contracts and agreed limits, then drafts the review with every variance flagged for your comment.',
    uses: ['read', 'match', 'check', 'draft', 'bulk'],
    stages: ['Collect budget and actuals', 'Match lines to contracts', 'Test against limits', 'Draft review memo'],
  },
  {
    slug: 'escrow-audit',
    ref: 'B2',
    name: 'Escrow audit',
    summary:
      'Works through escrow account statements, matches each deposit and withdrawal to its support, and prepares the audit file for your review.',
    uses: ['read', 'match', 'check', 'draft', 'bulk'],
    stages: ['Read statements', 'Match to support', 'Flag exceptions', 'Prepare audit file'],
  },
  {
    slug: 'financial-audit',
    ref: 'B3',
    name: 'Financial audit',
    summary:
      'Runs the year-end file: reads the client’s documents, vouches samples, casts schedules and prepares working papers and draft findings for the engagement team.',
    uses: ['read', 'match', 'check', 'draft', 'bulk'],
    stages: ['Read client documents', 'Vouch and cast', 'Raise findings', 'Draft working papers'],
  },
  {
    slug: 'interim-audit',
    ref: 'B4',
    name: 'Interim audit',
    summary:
      'The same file, run part-way through the year, so issues surface early and year-end starts with half the work already prepared.',
    uses: ['read', 'match', 'check', 'draft', 'bulk'],
    stages: ['Read period documents', 'Test controls and samples', 'Flag early issues', 'Carry forward to year-end'],
  },
  {
    slug: 'budget-preparation',
    ref: 'B5',
    name: 'Budget preparation',
    audience: 'For property management companies',
    summary:
      'Builds next year’s budget for each property from actuals, contracts and supplier quotes, ready for the property manager to adjust and approve.',
    uses: ['read', 'match', 'draft', 'bulk'],
    stages: ['Read actuals and contracts', 'Compare supplier quotes', 'Build budget by property', 'Hand over for approval'],
  },
]

export const tools = [
  {
    slug: 'purchase-order-extraction',
    ref: 'C1',
    name: 'Purchase-order extraction',
    summary:
      'Reads purchase orders in any layout and returns supplier, items, quantities, prices and totals as clean, structured data.',
    uses: ['read', 'bulk'],
    input: 'Purchase orders (PDF, scans, email attachments)',
    output: 'Structured line items, ready for your system',
  },
  {
    slug: 'vouching-automation',
    ref: 'C2',
    name: 'Vouching automation',
    summary:
      'Traces ledger entries to their invoices and receipts, and marks each one agreed, missing or mismatched.',
    uses: ['read', 'match', 'check', 'bulk'],
    input: 'Ledger extract and supporting documents',
    output: 'Vouching schedule with every exception referenced',
  },
  {
    slug: 'expense-working-automation',
    ref: 'C3',
    name: 'Expense working automation',
    summary:
      'Builds the expense working paper from the ledger and its support: grouped, cast and cross-referenced.',
    uses: ['read', 'match', 'draft'],
    input: 'Expense ledger and supporting documents',
    output: 'Expense working paper, cast and referenced',
  },
  {
    slug: 'financial-report-review',
    ref: 'C4',
    name: 'Financial report review',
    summary:
      'Reads a draft financial report and flags totals that don’t cast and figures that don’t agree between statements, notes and comparatives.',
    uses: ['read', 'check'],
    input: 'Draft financial statements',
    output: 'Review points, each tied to a page and figure',
  },
  {
    slug: 'tender-verification',
    ref: 'C5',
    name: 'Tender verification',
    summary:
      'Compares bids line by line, recalculates every total and flags missing items, so the evaluation starts from clean numbers.',
    uses: ['read', 'match', 'check'],
    input: 'Tender submissions and quotes',
    output: 'Side-by-side comparison with gaps flagged',
  },
  {
    slug: 'reconciliation',
    ref: 'C6',
    name: 'Reconciliation',
    summary:
      'Matches bank, supplier or intercompany statements to the ledger and lists only what doesn’t match.',
    uses: ['read', 'match', 'check', 'bulk'],
    input: 'Statements and ledger',
    output: 'Reconciliation with unmatched items only',
  },
]
