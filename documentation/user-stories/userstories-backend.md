# User Stories

## User Story One

    As a backend, I want to be able to allow guests to register with the web app, so I can have their details saved.

### Test Plan

- Check that account is registered with valid data
- Check that account is registered with valid extreme data
- Check that account is not registered with invalid data
- Check that account is not registered with invalid extreme data
- Check that functionality is not susceptible to SQL injection

## User Story Two

    As a backend, I want to be able to allow registered users to login to the website, so their details will be shown

### Test Plan

- Check that account is logged in with valid data
- Check that account is logged in with valid extreme data
- Check that account is not logged in with invalid data
- Check that account is not logged in with invalid extreme data
- Check that functionality is not susceptible to SQL injection

## User Story Three

    As a backend, I want to be able to allow logged in users to create a new listing, so they can sell their item

### Test Plan

- Allow logged in User to create new listing with valid data
- Allow logged in User to create new listing with extreme valid data
- Disallow Guest from creating new listing
- Disallow logged in User from creating new listing with invalid data
- Disallow logged in User from creating new listing with extreme invalid data
- Check that functionality is not susceptible to SQL injection

## User Story Four

    As a backend, I want to allow logged in users to add additional images to their listing, so buyers have a better view of the item.

### Test Plan

- Allow logged in user to add an additional image to own listing
- Allow logged in user to add multiple additional images to own listing
- Disallow Guest from adding additional images
- Disallow user from adding additional images to other listings

## User Story Five

    As a backend, I want to allow logged in users to edit their own listings, so they can rectify their listing

### Test Plan

- Allow logged in user to edit their own listing with valid data
- Allow logged in user to edit their own listing with extreme valid data
- Disallow logged in user to edit their own listing with invalid data
- Disallow logged in user to edit their own listing with extreme invalid data
- Disallow guest to edit listing
- Disallow user from editing other listings

## User Story Six

    As a backend, I want to allow logged in users to delete their own listings, so they can remove it if sold.

### Test Plan

- Allow logged in user to remove their own listing
- Disallow logged in user to remove other listing
- Disallow guest from removing listing

## User Story Seven

    As a backend, I want to allow logged in users to change their password, so that they can keep it secure.

### Test Plan

- Allow logged in user to change password with valid data
- Allow logged in user to change password with extreme valid data
- Disallow logged in user from changing password with incorrect current password
- Disallow logged in user from changing password with invalid data
- Disallow logged in user from changing password with extreme invalid data
- Disallow logged in user from changing other password
- Disallow guest from changing password
-

## User Story Eight

    As a backend, I want to allow admins to review listings before they go live, so that inappropriate listings are not shown

### Test Plan

- Allow admin to view provisional listings
- Allow admin to approve provisional listings
- Allow admin to decline provisional listings
- Disallow logged in user from viewing provisional listings
- Disallow guest from viewing provisional listings

## User Story Nine

As a backend, i want to allow all users to view listings, so that they can see what items they would like to buy

### Test Plan

-

## User Story Ten

As a backend, i want to allow all users to search for specific listings based on title, so that they can see what items they would like to buy

### Test Plan

-
