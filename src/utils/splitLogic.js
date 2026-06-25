/**
 * Computes net balance for each member across all payments.
 * Positive = owed money. Negative = owes others.
 */
export function computeBalances(members, payments) {
  const balances = {};
  members.forEach((m) => (balances[m] = 0));

  for (const p of payments) {
    const total = p.amount;
    const participants = [p.payer, ...p.splitWith];
    const share = total / participants.length;

    // Payer is owed their share back from everyone else
    balances[p.payer] += total - share; // net: paid full, keeps own share
    for (const person of p.splitWith) {
      balances[person] -= share;
    }
  }

  return balances;
}

/**
 * Greedy debt minimization — returns minimal list of transfers.
 * Each transfer: { from, to, amount }
 */
export function computeSettlement(members, payments) {
  const balances = computeBalances(members, payments);

  // Separate into creditors (positive) and debtors (negative)
  const creditors = [];
  const debtors = [];

  for (const [name, bal] of Object.entries(balances)) {
    if (bal > 0.005) creditors.push({ name, amount: bal });
    else if (bal < -0.005) debtors.push({ name, amount: -bal });
  }

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const transactions = [];

  // Greedy matching: largest debtor pays largest creditor
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const transfer = Math.min(debtor.amount, creditor.amount);

    if (transfer > 0.005) {
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(transfer * 100) / 100,
      });
    }

    debtor.amount -= transfer;
    creditor.amount -= transfer;

    if (debtor.amount < 0.005) i++;
    if (creditor.amount < 0.005) j++;
  }

  return transactions;
}