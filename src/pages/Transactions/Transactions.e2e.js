test('should show paid transaction on list', async () => {
  const transaction = await pagarme.transactions.create({
    amount: 1000,
    card_number: '4242424242424242',
    card_holder_name: 'JOHN DOVE',
    card_expiration_date: '0722',
    card_cvv: '123',
    installments: 1,
    customer: {
      name: 'Customer Teste',
      email: 'customer@email.com',
      document_number: '489.712.640-12',
      address: {
        zipcode: '06320100',
        neighborhood: 'Centro',
        street_number: '17',
        street: 'R Atilio Tolaine',
      },
      phone: { ddd: '11', number: '99999999' },
    },
  })

  await sleep(5000)

  await openAppLink('e2e://Transactions')

  await driver.setImplicitWaitTimeout(3000)
  const element = await driver.elementByAccessibilityId(transaction.id.toString())

  expect(element).toBeDefined()
})
