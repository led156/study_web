package com.led.hellospring.controller;

import com.led.hellospring.domain.Member;
import com.led.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller // 스프링 컨테이너에 해당 객체(이를 스프링 빈이라고 함)를 생성해서 넣어둔다.
public class MemberController {
    private final MemberService memberService;

    @Autowired // 스프링 컨테이너에 있는 memberService를 스프링이 연결해준다. <- memberService는 굳이 여러 객체를 생성해서 연결해줄 필요없기 때문에 하나만 생성하여 연결한다
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/new")
    public String createForm() {
        return "members/createMemberForm";
    }

    @PostMapping("/members/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());

        memberService.join(member);

        return "redirect:/";
    }

    @GetMapping("/members")
    public String list(Model model) {
        List<Member> members = memberService.findMembers();
        model.addAttribute("members", members);
        return "members/memberList";
    }
}
