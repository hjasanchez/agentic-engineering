# Check 2: recompute everything outside the model

**The rule.** Every sum that matters is calculated by the script or a spreadsheet, never by the model: each quote's own arithmetic
(line amounts, subtotal, VAT, total), and the like-for-like comparison (each request line priced for exactly what you asked, then
subtotal, VAT and total per supplier). The recommendation copies those figures; it does not make new ones.

**Why.** A language model predicts text. It gets arithmetic right most of the time, which is not good enough for a purchase order,
and suppliers make arithmetic mistakes too. A formula catches both, every time.

## With the script

`python -I checks/check_quotes.py` prints `PASS` or `MISMATCH` per quote (with the recomputed subtotal, VAT and total), then the
COMPARISON table, the AWARD under your rule and a THRESHOLD for incomplete quotes. It then reads `outputs/recommendation.md` and
fails if the table differs from its own, if the recommended award is not its AWARD, or if any figure in the recommendation or the
deviation report comes from neither the quotes, the request nor its output.

## With a spreadsheet (no code)

You do this part yourself; the assistant waits for your figures. Tested in LibreOffice Calc on the example; the formulas use only
IF, AND, OR, LEFT, ROUND, SUMIFS, COUNTIFS and TEXT, which Excel and Google Sheets also have.

1. Open `outputs/trace-table.csv` (the assistant gives it to you in chat). If your spreadsheet uses a decimal comma, import with the
   full stop as the decimal separator. Columns run A `supplier` to N `note`.
2. **Each quote's arithmetic.** In O1 type `check`; in O2 paste this and fill it down to the last row:

```
=IF(AND(C2="line",F2<>"",H2<>""),IF(ROUND(F2*H2,2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(F2*H2,"0.00")),IF(C2="subtotal",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line"),2)=ROUND(I2,2),"ok","MISMATCH: lines add up to "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line"),"0.00")),IF(C2="vat",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"subtotal")*J2/100,2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"subtotal")*J2/100,"0.00")),IF(C2="total",IF(ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")+ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")*SUMIFS($J:$J,$A:$A,A2,$C:$C,"vat")/100,2),2)=ROUND(I2,2),"ok","MISMATCH: should be "&TEXT(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")+ROUND(SUMIFS($I:$I,$A:$A,A2,$C:$C,"line")*SUMIFS($J:$J,$A:$A,A2,$C:$C,"vat")/100,2),"0.00")),""))))
```

3. **Like-for-like price per line.** In P1 type `normalised`; in P2 paste this and fill it down:

```
=IF(AND(C2="line",LEFT(B2,1)="R",OR(D2="quoted",D2="qualified"),M2<>""),ROUND(M2*H2,2),"")
```

   Before you trust it, check `units_needed` (column M) on every row whose unit differs from the request: it is the one number in
   this column the assistant chose.
4. **Per supplier.** In R1 to V1 type `supplier`, `subtotal`, `priced lines`, `VAT`, `total`. Put one supplier name per row from R2
   down, then in S2 to V2 paste these and fill them down:

```
S2: =SUMIFS(P:P,A:A,R2)
T2: =COUNTIFS(A:A,R2,P:P,">=0")
U2: =ROUND(S2*SUMIFS(J:J,A:A,R2,C:C,"vat")/100,2)
V2: =S2+U2
```

5. **Read it.** A quote is complete when `priced lines` equals the number of R lines in your request. Among complete quotes that
   meet your limits ([3-coverage.md](3-coverage.md)), apply your rule from the request to the `subtotal` column. Send the assistant
   exactly these: any `MISMATCH` rows from column O; column P for every request line and supplier (the like-for-like line prices);
   and per supplier the subtotal, priced lines, VAT and total (S to V), naming the lowest complete and compliant quote. It copies
   them into the recommendation and marks them as yours. Then you write the RESULT line. The spreadsheet does not give "Above the
   lowest" or THRESHOLD; those come from the script only.

If your spreadsheet uses semicolons between arguments (common in European locales), replace each comma outside the quotes with a
semicolon.

## In the example
Orrin Bay's six lines add up to 3,854.00; its summary says 3,584.00. Its VAT and total agree with the wrong subtotal, so the quote
looks tidy and reads 324.00 cheaper than its own lines. Script and spreadsheet both report it:

```
MISMATCH  Orrin Bay Systems: lines add up to 3,854.00, quote says subtotal 3,584.00 (difference 270.00)
MISMATCH  Orrin Bay Systems: recomputed VAT 770.80 and total 4,624.80, quote says total 4,300.80 (difference 324.00)
```

The per-supplier block gives Fernwick 4,006.20 (6 priced lines), Tallowmere 3,139.80 (5 of 6) and Orrin Bay 3,854.00 (6): the same
figures as the script's COMPARISON.
