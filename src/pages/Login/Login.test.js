describe('Pages - Login', () => {
  it('should redirect to home after login', async () => {
    const loginButton = await client.$('~login-button')
    await loginButton.click()
  })
})
