export const apis = {
    aws: 'https://14a5a2c1q6.execute-api.ap-south-1.amazonaws.com/dev', // verified for rentospot
    // aws: 'http://localhost:5000',
    drive: 'https://drive.google.com/uc?export=view&id=',
    s3_category: 'https://rentospot-publicfiles.s3.ap-south-1.amazonaws.com/siteImages/categories/',
    s3_subcategory: 'https://rentospot-publicfiles.s3.ap-south-1.amazonaws.com/siteImages/subcategories/',
    // backend
};

export const backend = {
    // fileUploads
    fileUpload: apis.aws + '/product/fileUpload',
    // user
    upload_user_identity: apis.aws + '/user/upload/identity/new',
    upload_user_myprofile: apis.aws + '/user/upload/myprofile',
    // product
    upload_jobForm: apis.aws + '/job/upload',
    upload_productForm: apis.aws + '/product/upload',
    // product myAds
    myads: apis.aws + '/product/myads',
    // product
    makeFeatured_product: apis.aws + '/product/featured/yes',
    removeFeatured_product: apis.aws + '/job/featured/no',
    getProduct: apis.aws + '/product/getProduct',
    getFeaturedProducts: apis.aws + '/product/getFeaturedProducts',
    // job
    // featured
    makeFeatured_job: apis.aws + '/job/featured/yes',
    removeFeatured_job: apis.aws + '/job/featured/no',

    job_freelancer: apis.aws + '/job/subcategory/Freelancer',
    job_professional: apis.aws + '/job/subcategory/Professional',
    // recent items
    getRecent: apis.aws + '/product/getRecent',
    findProducts: apis.aws + '/product/findProducts',
    // searches
    search_product: apis.aws + '/product/search',
    search_job: apis.aws + '/job/search',
    search_user: apis.aws + '/user/search',
};

export const params = {
    ads_action: 'ads_action',
    product_action: 'action',
    // category: 'category',
    // subcategory: 'subcategory',
    productId: 'product_Id',
};

export const paths = {
    home: '/',
    login: '/login/',
    uploads: '/uploads/',
    uploads_job: '/uploads/Jobs/',
    uploads_job_candidate: '/uploads/Jobs/Candidate/',
    uploads_job_employer: '/uploads/Jobs/Employer/',
    uploads_loginFirst: '/uploads/loginFirst',
    // myAds
    ads: '/ads/',
    myads: '/ads/myads',
    // success page
    success: '/success/',
    // success_uploads: '/success/uploads/',
    success_job: '/success/Jobs/',
    dashboard: '/dashboard/',
    dashboard_myprofile: '/dashboard/myProfile',
    // search area
    search: '/search/',
    search_jobs: '/search/Jobs/',
    search_freelancers: '/search/Jobs/Freelancer/',
    search_professional: '/search/Jobs/Professional/',
    featured: '/featured/',
    product: '/product/',
    // quick links
    about_us: '/About_us',
    services: '/Services',
    careers: '/Careers',
    contact: '/Contact',
};

export enum pics {
    header = '1JTEpFR6XzpIzs0PJ4pifh6_OJqYOjnIn',
    head = 's3://rentospot-admin-files/nav-header-image.jpg',
    card_category = 'https://rentospot-publicfiles.s3.ap-south-1.amazonaws.com/siteImages/categories/',
}
