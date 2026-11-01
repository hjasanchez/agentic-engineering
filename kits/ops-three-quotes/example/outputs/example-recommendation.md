# Recommendation: RFQ-EX-07 office network refresh

> SYNTHETIC EXAMPLE. Fictional companies, invented prices. This is the expected output of a good run on the example files.

**Status: DRAFT, NOT SIGNED.** Nothing has been sent to any supplier. The decision below is the operations lead's.

## The decision asked for
Which supplier installs the studio's new network before the move on 2026-11-20 [source: example-request.md].

## Recommendation
**Recommended award:** Orrin Bay Systems

Orrin Bay's subtotal is 3,854.00 excluding VAT, 4,624.80 including VAT (script: COMPARISON). Its own quote says 3,584.00, so it
has to confirm in writing which figure it will invoice before you sign. It is the lowest quote that prices every line and meets
every limit. Fernwick is +3.9% and not faster, so your "prefer faster" clause does not apply. Tallowmere has not priced
installation (R5).

## Comparison (pasted from check_quotes.py, unchanged)

| Line | Fernwick Network Supply | Tallowmere IT | Orrin Bay Systems |
|---|---|---|---|
| R1 24-port managed PoE+ switch, 2 each | 1,090.00 | 1,024.00 | 1,120.00 |
| R2 Wi-Fi 6 access point, ceiling mount, 4 each | 756.00 | 820.00 | 716.00 |
| R3 Cat6 patch cable, 1 m, 48 each | 115.20 | 100.80 | 108.00 |
| R4 Firewall appliance with 1-year security subscription, 1 each | 1,240.00 | 1,195.00 | 1,210.00 |
| R5 On-site installation and configuration, 1 day (8 h) | 760.00 (2 x 380.00 per half day (4 h)) | not priced | 640.00 |
| R6 Delivery to site, 1 lot | 45.00 | 0.00 | 60.00 |
| T1 Lead time from order, at most, 15 working days | 10 working days | 15 working days | 8 working days |
| T2 Hardware warranty, at least, 3 years | 3 years | 3 years | 3 years |
| Subtotal excl. VAT | 4,006.20 | 3,139.80 + R5 not priced | 3,854.00 |
| VAT | 801.24 (20%) | - | 770.80 (20%) |
| Total incl. VAT | 4,807.44 | - | 4,624.80 |
| Above the lowest | +3.9% | - | lowest |
| Complete and compliant | yes | no: R5 not priced | yes |

`AWARD  Orrin Bay Systems (rule: lowest complete and compliant; prefer faster if within 5% and at least 5 fewer working days on T1)`

Sources for every quoted figure: [example-trace-table.csv](example-trace-table.csv) (file, page and quote line per figure). Every
sum, the VAT, the percentage and the award come from `checks/check_quotes.py`, not from the assistant's arithmetic.

## Before you sign
1. Orrin Bay: ask which subtotal it will invoice, 3,854.00 or 3,584.00 excluding VAT (deviation rows 3 and 4).
2. Fernwick, if it stays in the running: confirm that two half days at 380.00 cover all of R5 (deviation row 1).
3. Tallowmere (optional): ask for an installation price. Script: THRESHOLD, it wins under your rule only if R5 comes to 530.67 or
   less, excluding VAT (deviation row 2).
4. Orrin Bay states no validity date; Fernwick's quote is valid 30 days from 2026-10-20 [source: example-quote-A-fernwick.txt p.1].

## Checks
`RESULT  READY FOR REVIEW: figures traced, sums and award computed here, every finding reported. The decision is yours.`
Findings: 1 FLAG (Fernwick R5 unit), 2 MISMATCH (Orrin Bay subtotal and total), 2 GAP (Fernwick R5 qualified, Tallowmere R5
missing). All are in [example-deviation-report.md](example-deviation-report.md).

## Sign-off (the person, not the assistant)
- [ ] Award to: ______________________ at ______________ excluding VAT
- [ ] Hold until the questions above are answered
- Name: ______________________ Date: __________
- Order placed by: ______________________ (a person; the assistant never places orders or contacts suppliers)
