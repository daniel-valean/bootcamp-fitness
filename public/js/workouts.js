function view_workout() {
    fetch("/api/user/workout")
    const userData = User.findOne({ where: { email: req.body.email } });

}