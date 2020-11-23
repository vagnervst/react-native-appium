describe('Pages - App', () => {
  it('should pass', async () => {
    const field = await client.$('~test-element')
    const fieldText = await field.getText()

    expect(fieldText).toBe('Step One')
  })
})
