<!DOCTYPE html>
<?php
  $protocol = "https://"; // Always use HTTPS
  $domainName = $_SERVER['HTTP_HOST'];
  $path = rtrim(dirname($_SERVER['PHP_SELF']), '/\\') . '/';

  $base_url = $protocol . $domainName . $path;
?>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Divenzo - UI/UX Design Agency</title>
  
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Ramabhadra:wght@400&family=Open+Sans:wght@400&display=swap" rel="stylesheet">
  
  <!-- Custom CSS -->
  <link rel="stylesheet" href="<?php echo $base_url ?>assets/css/style.css">
</head>
<body>
  <!-- Header -->
  <header class="header-section">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand" href="#">
          <img src="https://c.animaapp.com/mdp6rhuh2Ke7f5/img/group-213102.png" alt="Divenzo" class="logo">
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link" href="#about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#services">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#projects">Projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#process">Process</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
          <a href="#contact" class="btn btn-primary quote-btn">Get Quote</a>
        </div>
      </div>
    </nav>
  </header>