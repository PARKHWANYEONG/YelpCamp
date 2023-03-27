const User = require('../models/user');


module.exports.renderRegister = (req, res) => {
    res.render('user/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        //passport-local-mongoose로 인해 register 메소드 사용가능
        // 간단하게 인스턴스와 패스워드를 인자로 넣으면 해시,솔트를 생성해준다.
        //아이디 중복도 확인해줌..ㅎ (중복일경우 오류)
        const registeredUser = await User.register(user, password);
        //req.login은 새로 등록한 사용자를 자동으로 로그인상태로 유지하는 기능 (passport에 있는)
        //passport.authenticate은 req.login을 자동으로 호출해서 인증받는다
        req.login(registeredUser, (err) => {
            if (err) next();
            req.flash('success', 'Welcome To Yelp-Camp 😊');
            res.redirect('/campgrounds');
        })
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('user/login');
}

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    req.flash('success', 'Welcome Back!');
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next();
        } else {
            req.flash('success', 'GoodBye!');
            res.redirect('/campgrounds');
        }
    })
}