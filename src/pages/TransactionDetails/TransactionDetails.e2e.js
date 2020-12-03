test('should hide refunded transaction from transactions list', async () => {
  const transaction = await pagarme.transactions.create({
    amount: 1000 + Math.ceil(Math.random() * 20),
    card_number: '4242424242424242',
    card_holder_name: 'JOHN DOVE',
    card_expiration_date: '0722',
    card_cvv: '123',
    installments: 1,
    customer: {
      name: `Customer Teste`,
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

  await driver.setImplicitWaitTimeout(5000)

  const element = await driver.elementByAccessibilityId(transaction.id.toString())
  await element.click()

  const refundButton = await driver.elementByXPath('//*[@text="REFUND"]')
  await refundButton.click()

  await sleep(1000)

  await driver.back()

  await sleep(1000)

  let action = new wd.TouchAction(driver)
  action.press({ x: 530, y: 300 })
    .wait(1000)
    .moveTo({ x: 530, y: 1200 })
    .release()

  await action.perform()

  await sleep(1000)

  const hasElement = await driver.elementsByAccessibilityId(transaction.id.toString()).length > 0
  expect(hasElement).toBe(false)
})
