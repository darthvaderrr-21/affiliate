var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    localStrategy         = require('passport-local'),
    passportLocalStrategy = require('passport-local-mongoose'),
    bodyParser            = require('body-parser'),
    User                  = require('./models/user');
 
mongoose.connect('mongodb://localhost/affiliate_user');

var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(require('express-session')({
    secret:'Login successfully',
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =============================================================

app.get('/login',function(req,res){
    res.render('login')
});

app.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}),function(req,res){});

app.get('/register',function(req,res){
    res.render('register')
});

app.post('/register',function(req,res){
    var new_email = req.body.email
    var new_password = req.body.password
    User.register(new User({email:new_email}),new_password,function(err,new_user){
        if(err){console.log('Try again')}
        else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/')
            })
        }
    })
});

app.get('/logout',function(req,res){
    req.logOut();
    res.redirect('/');
});

// ==============================================================

app.get('/laptop',function(req,res){
    res.render('page2_laptop');
});

app.get('/Headphoneandspeakers',function(req,res){
    res.render('page2_headphone');
});

app.get('/Keyboardandmouse',function(req,res){
    res.render('page2_keyboard');
});


app.get('/menfashion',function(req,res){
    res.render('page2_men');
});

app.get('/womenfashion',function(req,res){
    res.render('page2_women');
});

app.get('/gymandfitness',function(req,res){
    res.render('page2_fitness');
});
// ==========================================================

app.get('/dslr',function(req,res){
    res.render('dslr');
});

app.get('/smartwatch',function(req,res){
    res.render('smart_watch');
});

app.get('/controler',function(req,res){
    res.render('controler');
});

app.get('/echoandalexa',function(req,res){
    res.render('echo');
});
// =============================================================

app.get('/apple_macbook',function(req,res){
    res.render('apple_mac');
});

app.get('/apple_ipad',function(req,res){
    res.render('apple_ipad');
});


app.get('/apple_iphone',function(req,res){
    res.render('apple_iphone');
});


app.get('/apple_accessories',function(req,res){
    res.render('apple_accessory');
});

// ========================================================


app.get('/harddrive',function(req,res){
    res.render('harddisk');
});


app.get('/Powerbank',function(req,res){
    res.render('powerbank');
});

app.get('/datacable',function(req,res){
    res.render('datacable');
});

app.get('/',function(req,res){
    res.render('index');
});
// ===========================================================

app.get('/protien_supplements',function(req,res){
    res.render('protein');
});

app.get('/creatine_supplements',function(req,res){
    res.render('creatine');
});

app.get('/bcaa_supplements',function(req,res){
    res.render('bcaa');
});

app.get('/other_supplements',function(req,res){
    res.render('supplements');
});

// =============================================================

app.get('/mobilephones',function(req,res){
    res.render('unavailable');
});

app.get('/mensfashion',function(req,res){
    res.render('unavailable');
});

app.get('/womensfashion',function(req,res){
    res.render('unavailable');
});

app.get('/unavailable',function(req,res){
    res.render('unavailable');
});

app.get('/',function(req,res){
    res.render('index');
});


// ==============================================================

app.listen(3000,process.env.IP,function(req,res){
    console.log('server is listening...')
})