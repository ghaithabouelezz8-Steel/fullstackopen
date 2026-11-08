const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page,request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users',{data:{
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
    }})
    await request.post('http://localhost:3001/api/users',{data:{
        name: 'not Matti Luukkainen',
        username: 'not mluukkai',
        password: 'not salainen'
    }})
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('link',{name:'login'}).click()
   const locator=  page.getByRole('heading',{name:'login'})
   await expect(locator).toBeVisible()

  })
    describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByRole('link',{name:'login'}).click()
    await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salainen')

    await page.getByRole('button',{name:'login'}).click()
    const locator=page.getByRole('button',{name:'logout'})

    await expect(locator).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByRole('link',{name:'login'}).click()
       await page.getByRole('textbox').first().fill('mluukkai')
    await page.getByRole('textbox').last().fill('salssss')

    await page.getByRole('button',{name:'login'}).click()
    

    await expect(page.getByText('failed to log in : wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {

  await  page.getByRole('link',{name:'login'}).click()
     
      await page.getByLabel('username').fill('mluukkai')
      await page.getByLabel('password').fill('salainen')
      await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('link',{name:'new Blog'}).click()
    
    
    await page.getByRole('textBox').nth(0).fill('testing title')
    await page.getByRole('textBox').nth(1).fill('testing author')
    await page.getByRole('textBox').nth(2).fill('testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()

    await(expect(page.getByText('testing title',{exact:true}))).toBeVisible()
    await expect(page.getByRole('alert')).toContainText('the creation of testing title succeeded')
})
    test('a new blog can be liked', async ({ page }) => {
    await page.getByRole('link',{name:'new Blog'}).click()
    
    await page.getByRole('textBox').nth(0).fill('testing title')
    await page.getByRole('textBox').nth(1).fill('testing author')
    await page.getByRole('textBox').nth(2).fill('testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()
    
    await page.getByRole('link',{name:'testing title'}).click()
    await page.getByRole('button',{name:'like'}).click()

    await(expect(page.getByText('likes: 1'))).toBeVisible()
})
    test('a new blog can be deleted', async ({ page }) => {
    await page.getByRole('link',{name:'new Blog'}).click()
    
     await page.getByRole('textBox').nth(0).fill('testing title')
    await page.getByRole('textBox').nth(1).fill('testing author')
    await page.getByRole('textBox').nth(2).fill('testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()

    await page.getByRole('link',{name:'testing title'}).click()
    await page.getByRole('button',{name:'remove'}).click()

    await(expect(page.getByRole('link',{name:'testing title'}))).toHaveCount(0)
})
test('only the user who added the blog can see the delete button',async({page})=>{
 await page.getByRole('link',{name:'new Blog'}).click()
    
     await page.getByRole('textBox').nth(0).fill('testing title')
    await page.getByRole('textBox').nth(1).fill('testing author')
    await page.getByRole('textBox').nth(2).fill('testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()
    await page.getByRole('link',{name:'testing title'}).click()
    
    await expect(page.getByRole('button',{name:'remove'})).toBeVisible()
    await page.getByRole('button',{name:'logout'}).click()


      await page.getByRole('link',{name:'login'}).click()
    
      await page.getByLabel('username').fill('not mluukkai')
      await page.getByLabel('password').fill('not salainen')
      await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('link',{name:'blogs'}).click()
    await page.getByRole('link',{name:'testing title'}).click()
      await expect(page.getByRole('button',{name:'remove'})).toHaveCount(0)
    




})

/*test('the blogs should be arranged from highest in likes to lowest',async({page})=>{
    await page.getByRole('button',{name:'new Blog'}).click()
    const textBoxes = await page.getByRole('textbox').all()
    await textBoxes[0].fill('testing title')
    await textBoxes[1].fill('testing author')
    await textBoxes[2].fill('testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()
    

    await page.getByRole('button',{name:'cancel'}).click()
    await expect(page.getByText('testing author')).toBeVisible()

    await page.getByRole('button',{name:'new Blog'}).click()
    const textBoxes2 = await page.getByRole('textbox').all()
    await textBoxes2[0].fill('somethingT')
    await textBoxes2[1].fill('somethingA')
    await textBoxes2[2].fill('not testingUrl.com')

    await page.getByRole('button',{name:'create'}).click()

    await expect(page.getByText('somethingA')).toBeVisible()
    
    const blog1 = page.locator('.blog', { hasText: 'testing author' })
    const blog2=page.locator('.blog',{hasText:'somethingA'})
    await blog1.getByRole('button',{name:"view"}).click()
    await blog2.getByRole('button',{name:"view"}).click()
    await blog2.getByRole('button',{name:"like"}).click()
    await blog2.getByRole('button',{name:"like"}).click()
    await blog1.getByRole('button',{name:'like'}).click()


    const blogs=page.locator('.blog')
    await expect(blogs.nth(0)).toContainText('somethingT')
    await expect(blogs.nth(1)).toContainText('testing title')
    

    
})*/
})
})