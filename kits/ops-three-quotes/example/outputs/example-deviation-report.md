# Deviation report: RFQ-EX-07 office network refresh

> SYNTHETIC EXAMPLE. Fictional companies, invented prices. This is the report a good run produces on the example files.

Everywhere this comparison departs from the request or from the quotes as written, or rests on a reading I chose. One row per
item. Sources are file and page in `inbox/`. Every sum below was printed by `checks/check_quotes.py`.

| # | Supplier | Line | The request asked | The quote says | What I did | Why | Your call |
|---|---|---|---|---|---|---|---|
| 1 | Fernwick Network Supply | R5 | 1 day (8 h) of installation | 1 half day (4 h) at 380.00; "Additional half days of installation: EUR 380.00 each, agreed in advance" [source: example-quote-A-fernwick.txt, p.1 item 5; p.2 Terms] | Set units_needed to 2; the script priced R5 at 760.00 | The quote itself prices the extra half day | Confirm with Fernwick that two half days cover all of R5 |
| 2 | Tallowmere IT | R5 | 1 day (8 h) of installation | Nothing: no line and no mention [source: example-quote-B-tallowmere.txt, p.1] | Marked missing; the script verified that no installation or configuration wording appears in the quote | I do not invent a price | Ask Tallowmere for a price, or drop the quote. Script THRESHOLD: it wins only if R5 comes to 530.67 or less |
| 3 | Orrin Bay Systems | subtotal | Prices excluding VAT, VAT shown separately | Lines 1 to 6; summary subtotal 3,584.00 [source: example-quote-C-orrinbay.txt, p.1 pos 1-6; p.2 Summary] | Copied 3,584.00 as printed; the comparison uses the script's 3,854.00 | Script MISMATCH: the lines add up to 3,854.00, a difference of 270.00, which looks like transposed digits | Ask Orrin Bay which figure it will invoice |
| 4 | Orrin Bay Systems | total | as above | Total 4,300.80 [source: example-quote-C-orrinbay.txt, p.2 Summary] | The comparison uses the script's VAT 770.80 and total 4,624.80 | Script MISMATCH, follows from row 3 | Same question as row 3 |
| 5 | Tallowmere IT | R4 | Firewall appliance with 1-year security subscription | "Security gateway with 1-year protection subscription" [source: example-quote-B-tallowmere.txt, p.1 line 4] | Read it as R4 | Same function under another name; this is my reading, not the supplier's statement | Confirm it is a firewall with the subscription included |

## Check results (pasted from the last run)

```
RESULT  READY FOR REVIEW: figures traced, sums and award computed here, every finding reported. The decision is yours.
```

## What I did not do

Contact any supplier, accept or reject a quote, or change anything in `inbox/`.
