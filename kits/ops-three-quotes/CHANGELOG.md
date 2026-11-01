# Changelog

## 0.1 (2026-11-01)

- First release: instruction file, a chat bundle for assistants without folders, three checks (trace, recompute, coverage and
  compliance) with spreadsheet formulas and `check_quotes.py`, templates for the request, recommendation, deviation report and
  trace table, and a worked example with three fictional quotes, one planted fault each.
- `check_quotes.py` traces each figure to its quote line, verifies lines marked missing, recomputes each quote, prices every quote
  for exactly what was requested, checks the request's limits, applies the award rule, and checks the recommendation against its
  own figures.
- Not yet run on real quotes. The design-partner runs come next.
