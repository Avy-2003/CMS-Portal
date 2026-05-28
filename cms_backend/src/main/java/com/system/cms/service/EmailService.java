package com.system.cms.service;

import com.system.cms.entity.Complaint;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendComplaintNotification(
            String toEmail,
            Complaint complaint) {

        try {

            // Thymeleaf Context
            Context context = new Context();

            context.setVariable(
                    "id",
                    complaint.getId());

            context.setVariable(
                    "title",
                    complaint.getTitle());

            context.setVariable(
                    "status",
                    complaint.getStatus());

            context.setVariable(
                    "userName",
                    complaint.getUser().getName());

            context.setVariable(
                    "description",
                    complaint.getDescription());

            context.setVariable(
                    "phone",
                    complaint.getUser().getPhone());


            context.setVariable(
                    "email",
                    complaint.getUser().getEmail());

            context.setVariable(
                    "location",
                    complaint.getLocation());


            // Process HTML Template
            String htmlContent =
                    templateEngine.process(
                            "complaint-email",
                            context);

            // Create Mail Message
            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);


            helper.setFrom(
                    "abhishekgowdavy8@gmail.com",
                    "CMS Portal"
            );

            helper.setTo(toEmail);

            helper.setSubject(
                    "New Complaint Raised - CMS Portal");

            helper.setText(htmlContent, true);

            // Send Mail
            mailSender.send(message);

            System.out.println(
                    "Email sent successfully");

        } catch (Exception e) {

            e.printStackTrace();
        }
    }
}