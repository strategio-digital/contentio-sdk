<?php
/**
 * Copyright (c) 2021 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.digital, jz@strategio.digital)
 */
declare(strict_types=1);

namespace ContentioSdk\Controller;

use ContentioSdk\Attribute\Template;
use ContentioSdk\Controller\Base\BaseController;

class CustomerController extends BaseController
{
    public function logout(): never
    {
        $this->userLogout();
    }
    
    #[Template(path: __DIR__ . '/../../view/controller/customer/login.latte')]
    public function login(): void
    {
        if ($this->userLogged()) {
            $this->redirect('/zakaznik/objednavky');
        }
    }
    
    #[Template(path: __DIR__ . '/../../view/controller/customer/register.latte')]
    public function register(): void
    {
        if ($this->userLogged()) {
            $this->redirect('/zakaznik/objednavky');
        }
    }
    
    #[Template(path: __DIR__ . '/../../view/controller/customer/password-recovery.latte')]
    public function passwordRecovery(): void
    {
        if ($this->userLogged()) {
            $this->redirect('/zakaznik/objednavky');
        }
    }
    
    #[Template(path: __DIR__ . '/../../view/controller/customer/orders.latte')]
    public function orders(): void
    {
        if (!$this->userLogged()) {
            $this->redirect('/zakaznik/prihlaseni?logout=true');
        }
    }
}
